""" base objects for the app"""
import os
import traceback
import asyncio
from .util import hacker_news_feeds
from roadmap.models import RoadMap as RoadMapModel

class Map(object):
    """Map Object"""

    def __init__(self, _id, name, description):
        self.id = _id
        self.name = name
        self.description = description
        self.children = {}
        self._nodes = set()

    def __hash__(self):
        return hash(self.id)

    def add_node(self, node):
        """Add node to root"""
        self.children[node.id] = node
        self._nodes.add(node)
        return node

    def remove_node(self, node):
        """Remove node from the tree"""
        if node in self._nodes:
            self._nodes.remove(node)
            return self.children.pop(node.id)
        else:
            for child in self._nodes:
                value = child.remove_node(node)
                if value:
                    return value
        return None

    def find_node(self, node):
        """Find a node in a tree"""
        if node == self:
            return self
        if node in self._nodes:
            return self.children[node.id]
        else:
            for child in self._nodes:
                value = child.find_node(node)
                if value:
                    return value
        return None

    def change(self, **kwargs):
        """update the current node"""
        for arg in kwargs:
            value = kwargs[arg]
            if value:
                setattr(self, arg, value)
        return True

    def update_node(self, node, **kwargs):
        """Update a node in a tree"""
        if node == self:
            return self.change(**kwargs)
        for child in self._nodes:
            if child == node:
                child.change(**kwargs)
        for child in self._nodes:
            child.update_node(node, **kwargs)

    def to_dict(self):
        """serialize the entire map to dict"""
        result = {}
        result[self.id] = {"id": self.id,
                           "label": self.name,
                           "description": self.description,
                           "children": {}}
        for child_key in self.children:
            result[self.id]["children"].update(
                self.children[child_key].to_dict())
        return result

    def __eq__(self, other):
        return self.id == other.id

    @property
    def depth(self):
        """depth of the entire tree"""
        if not self._nodes:
            return 1
        else:
            return 1 + max(x.depth for x in self._nodes)

    def level(self, k):
        """ Get all nodes on the same level"""
        if k == 0:
            return [self]
        else:
            result = []
            for child in self._nodes:
                result += child.level(k - 1)
            return result

    @classmethod
    def loads(cls, dct):
        """load from dict"""
        _map = None
        for key in dct:
            _map = cls.load(dct[key])
            children = dct[key]["children"]
            for child, value in children.items():
                node = cls.loads({child: value})
                _map.add_node(node)
        return _map

    @classmethod
    def load(cls, dct_unit):
        """load from dict"""
        _id = dct_unit.get("id")
        name = dct_unit.get("label")
        description = dct_unit.get("description")
        return Map(_id, name, description)

    @property
    def layers(self):
        """get layers"""
        result = {}
        for i in range(self.depth):
            result[i] = self.level(i)
        return result

    @property
    def keys(self):
        _keys = [self.name]
        for child in self.children:
            _keys += self.children[child].keys
        return _keys


class RoadMap(object):
    """Adding RoadMap base object"""

    db = RoadMapModel

    def __init__(self, no_id, name, start=(None, None)):
        self._id = no_id
        self.name = name
        self.root = Map(no_id, start[0], start[1])
        self.sno = None

    def create(self, _id, *args):
        """Adding a new entry to the tree"""
        _map = Map(*args)
        parent = self.get(_id)
        if not parent:
            return None
        parent.add_node(_map)
        return _map

    def get(self, _id):
        """Get the subtree"""
        _node = Map(_id, None, None)
        return self.root.find_node(_node)

    def delete(self, _id):
        """Delete the subtree"""
        _node = Map(_id, None, None)
        return self.root.remove_node(_node)

    def update(self, _id, **kwargs):
        """update the subtree"""
        _node = Map(_id, None, None)
        return self.root.update_node(_node, **kwargs)

    def to_dict(self):
        """Get the dict"""
        return self.root.to_dict()

    def put(self):
        """put it to disk"""
        entity, flag = self.db.get_or_create(id=self._id, defaults={
            "name": "",
            "map":"",
            "description": ""
        })
        entity.name = self.name
        entity.map_json = self.root.to_dict()
        entity.save()
        return entity.id

    @classmethod
    def get_map(cls, _id):
        """getting the class map object"""
        _dict = cls.db.search(_id)
        if _dict:
            _root = Map.loads(_dict.map_json)
            _instance = cls(_dict.id, _dict.name)
            _instance.root = _root
            _instance.sno = _dict.id
            return _instance
        return None

    @classmethod
    def list(cls):
        """getting list of classes"""
        return cls.db.select().execute()

    @classmethod
    def delete_map(cls, _id):
        """delete the map"""
        try:
            _map = cls.db.delete().where(cls.db.id == _id)
            _map.execute()
            return True
        except:
            print(traceback.format_exc())
            return False

    def keys(self):
        """ Get all named values"""
        return self.root.keys

    async def feeds(self):
        """get all related news"""
        news_tags = self.keys()
        response = await hacker_news_feeds(*news_tags)
        return response

##test
if __name__ == "__main__":
    root = RoadMap("1", "hackmap", start=("2015", "Start of 2015"))
    root.create("1", "1.1", "Web Dev", "Web Development")
    root.create("1", "1.2", "Machine Learning", "ML")
    print(root.to_dict())
    root.put()
    mapped = RoadMap.get_map("1")
    print(mapped.name)
    print(mapped.keys)
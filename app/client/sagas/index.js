import {
  createMapSaga
} from './mapsaga';
import {editNodeForTree,addNodeForTree, removeNodeForTree} from './nodesaga';
import NotifySaga from './notificationSaga';

export default function* rootSaga() {
  yield [
    createMapSaga(),
    editNodeForTree(),
    addNodeForTree(),
    removeNodeForTree(),
    NotifySaga()
  ];
}
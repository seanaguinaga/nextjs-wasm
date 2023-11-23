import {
  RepoContext,
  useDocument,
} from "@automerge/automerge-repo-react-hooks";
import * as A from "@automerge/automerge/next";

import { isValidAutomergeUrl, Repo } from "@automerge/automerge-repo";
import { BroadcastChannelNetworkAdapter } from "@automerge/automerge-repo-network-broadcastchannel";
import { IndexedDBStorageAdapter } from "@automerge/automerge-repo-storage-indexeddb";

const repo = new Repo({
  network: [new BroadcastChannelNetworkAdapter()],
  storage: new IndexedDBStorageAdapter(),
});

const rootDocUrl = `${document.location.hash.substring(1)}`;
let handle;
if (isValidAutomergeUrl(rootDocUrl)) {
  handle = repo.find(rootDocUrl);
} else {
  handle = repo.create<{ counter?: A.Counter }>();
  handle.change((d: any) => (d.counter = new A.Counter()));
}
const docUrl = (document.location.hash = handle.url);

interface CounterDoc {
  counter: A.Counter;
}

function Component() {
  const [doc, changeDoc] = useDocument<CounterDoc>(docUrl);

  doc &&
    A.getHistory(doc).forEach((state) => {
      console.log(state.snapshot.counter && state.snapshot.counter.value);
    });

  return (
    <button onClick={() => changeDoc((d: any) => d.counter.increment(1))}>
      count is {doc && doc.counter.value}
    </button>
  );
}

export default function Automerge() {
  return (
    <RepoContext.Provider value={repo}>
      <Component />
    </RepoContext.Provider>
  );
}

import toast, { Toaster } from "react-hot-toast";

import React from "react";

export function Test() {
  const notify = () => toast("Here is your toast.");
  return (
    <div>
      <button onClick={notify}>Make me a toast</button>
      <Toaster />
    </div>
  );
}

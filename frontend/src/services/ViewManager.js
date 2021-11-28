import router from "../router";
import io from "socket.io-client";

class ViewManager {
  constructor() {
    this.socket = null;
    this.status = null;
    this.id = null;
    this.consultant = null;
  }

  changeView() {
    switch (this.status) {
      case "CONNECTED":
        router.push({
          name: "connected",
          params: {
            status: "connected",
            callsId: this.id,
            consultant: this.consultant,
          },
        });
        break;
      case "FAILED":
        router.push({
          name: "failed",
          params: {
            status: "failed",
            callsId: this.id,
            consultant: this.consultant,
          },
        });
        break;
      case "ANSWERED":
        router.push({
          name: "answered",
          params: {
            status: "answered",
            callsId: this.id,
            consultant: this.consultant,
          },
        });
    }
  }
  checkStatus(id, consultant) {
    this.id = id;
    this.consultant = consultant;

    this.socket = io("http://localhost:3000", {
      reconnection: false,
      transports: ["websocket", "polling"],
    });

    this.socket.on(`status${this.id}`, (payload) => {
      if (payload) {
        this.status = payload;
        this.changeView();
      }
    });
  }
  stopPolling() {
    this.socket.disconnect();
  }
}

export default new ViewManager();

import axios from "axios";
import { SERVERADDRESS } from "../config";

export function axiosGet(path) {
  path = slashAdder(path);
  return axios.get(`${SERVERADDRESS}${path}`, {
    headers: {
      authorization:
        "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1NzQ5MjIyODEsImV4cCI6MTYwNjQ1ODI4MSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIm9wZW5pZCI6ImNiczAwMSIsImlkIjoiMSJ9.mL1x0scDLEGhJ9RFAUkRLeVz7JVAIppDfu6IxGo-zrg"
    }
  });
}

export function axiosPost(path, body) {
  path = slashAdder(path);
  return axios.post(`${SERVERADDRESS}${path}`, body, {
    headers: {
      authorization:
        "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1NzQ5MjIyODEsImV4cCI6MTYwNjQ1ODI4MSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIm9wZW5pZCI6ImNiczAwMSIsImlkIjoiMSJ9.mL1x0scDLEGhJ9RFAUkRLeVz7JVAIppDfu6IxGo-zrg"
    }
  });
}

export function axiosDelete(path) {
  path = slashAdder(path);
  return axios.delete(`${SERVERADDRESS}${path}`, {
    headers: {
      authorization:
        "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1NzQ5MjIyODEsImV4cCI6MTYwNjQ1ODI4MSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIm9wZW5pZCI6ImNiczAwMSIsImlkIjoiMSJ9.mL1x0scDLEGhJ9RFAUkRLeVz7JVAIppDfu6IxGo-zrg"
    }
  });
}

function slashAdder(path) {
  if (!path.startsWith("/")) {
    path = `/${path}`;
  }

  return path;
}

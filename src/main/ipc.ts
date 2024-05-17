import { ipcMain } from "electron";
import { randomUUID } from "node:crypto";

import { store } from "./store";

import { IPC } from "@shared/constants/ipc";
import {
  CreateDocumentResponse,
  DeleteDocumentRequest,
  FetchAllDocumentsResponse,
  FetchDocumentRequest,
  FetchDocumentResponse,
  IDocument,
  SaveDocumentRequest,
} from "@shared/types/ipc";

ipcMain.handle(
  IPC.DOCUMENTS.FETCH_ALL,
  async (): Promise<FetchAllDocumentsResponse> => {
    return {
      data: Object.values(store.get("documents")),
    };
  }
);

ipcMain.handle(
  IPC.DOCUMENTS.FETCH,
  async (_, { id }: FetchDocumentRequest): Promise<FetchDocumentResponse> => {
    const document = store.get(`documents.${id}`) as IDocument;

    return {
      data: document,
    };
  }
);

ipcMain.handle(
  IPC.DOCUMENTS.CREATE,
  async (): Promise<CreateDocumentResponse> => {
    const id = randomUUID();

    const document: IDocument = {
      id,
      title: "Untitled",
    };

    store.set(`documents.${id}`, document);

    return {
      data: document,
    };
  }
);

ipcMain.handle(
  IPC.DOCUMENTS.SAVE,
  async (_, { id, title, content }: SaveDocumentRequest): Promise<void> => {
    store.set(`documents.${id}`, {
      id,
      title,
      content,
    });
  }
);

ipcMain.handle(
  IPC.DOCUMENTS.DELETE,
  async (_, { id }: DeleteDocumentRequest): Promise<void> => {
    // @ts-ignore (https://github.com/sindresorhus/electron-store/issues/196)
    store.delete(`documents.${id}`);
  }
);

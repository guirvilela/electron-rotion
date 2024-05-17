import { ReactNode } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import { DotsThree } from "phosphor-react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { IDocument } from "~/src/shared/types/ipc";

interface LinkProps {
  to: string;
  children: ReactNode;
}

export function Link({ children, to }: LinkProps) {
  const { id } = useParams();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutateAsync: deleteDocument, isLoading: isDeletingDocument } =
    useMutation(
      async () => {
        await window.api.deleteDocument({ id: id! });
      },
      {
        onSuccess() {
          queryClient.setQueryData<IDocument[]>(["documents"], (documents) => {
            return documents?.filter((document) => document.id !== id);
          });

          navigate("/");
        },
      }
    );

  return (
    <NavLink
      to={to}
      className={({ isActive }) => {
        return clsx(
          "flex items-center text-sm gap-2 text-rotion-100 hover:text-rotion-50 py-1 px-3 rounded group hover:bg-rotion-700",
          {
            "bg-rotion-700": isActive,
          }
        );
      }}
    >
      <span className="flex-1 truncate">{children}</span>

      <div className="flex items-center h-full ml-auto group-hover:visible text-rotion-100">
        <button
          className="px-px rounded-sm hover:bg-rotion-500"
          onClick={() => deleteDocument()}
        >
          <DotsThree weight="bold" className="w-4 h-4" />
        </button>
      </div>
    </NavLink>
  );
}

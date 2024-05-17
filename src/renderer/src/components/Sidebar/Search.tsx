import { MagnifyingGlass } from "phosphor-react";
import { useState } from "react";

import { SearchBar } from "../SearchBar";

export function Search() {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);

  function handleOpenChange() {
    setIsSearchBarOpen((state) => !state);
  }

  return (
    <>
      <button
        onClick={() => setIsSearchBarOpen(true)}
        className="flex items-center gap-2 mx-5 text-sm text-rotion-100 hover:text-rotion-50"
      >
        <MagnifyingGlass className="w-5 h-5" />
        Busca rápida
      </button>

      <SearchBar open={isSearchBarOpen} onOpenChange={handleOpenChange} />
    </>
  );
}

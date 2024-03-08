import { ActionIcon, TextInput, TextInputProps } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconSearch, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";

interface SearchInputProps extends TextInputProps {
  onClear?: () => void;
  onSearch?: (query: string) => void;
}

export default function SearchInput({ onClear, onSearch, ...props }: SearchInputProps) {
  const [query, setQuery] = useState("");
  const [debounceQuery] = useDebouncedValue(query, 500);
  const handleClear = () => {
    setQuery("");
    onClear?.();
  };
  useEffect(() => {
    onSearch?.(debounceQuery);
  }, [debounceQuery]);

  return (
    <TextInput
      value={query}
      onChange={(e) => setQuery(e.currentTarget.value)}
      leftSection={<IconSearch />}
      rightSection={
        <ActionIcon
          onClick={handleClear}
          variant="transparent"
          className="bg-transparent hover:bg-transparent"
        >
          <IconX className="text-primary-600" />
        </ActionIcon>
      }
      {...props}
    />
  );
}

import { useCallback, useRef } from "react";
import { ValueType, ActionMeta } from "react-select";
import AsyncSelect from "react-select/async";
import { useSearchPlayerByName } from "../../hooks/useSearchPlayerByName/useSearchPlayerByName";
import { Player } from "../../interfaces/player";
import { GoSearch } from "react-icons/go";

interface PlayerSearchOption {
  value: Player;
  label: string;
}

interface PlayerSearchBarProps {
  setSelectedPlayer: (newPlayerId: string) => void;
}

export const PlayerSearchBar = (props: PlayerSearchBarProps) => {
  const { setSelectedPlayer } = props;
  const [, searchingPlayers, , searchPlayerByName] = useSearchPlayerByName();

  const timeout = useRef<number>(-1);
  const loadOptions = useCallback(
    (
      newSearchTerm: string,
      setOptions: (options: PlayerSearchOption[]) => void
    ) => {
      window.clearTimeout(timeout.current);
      timeout.current = window.setTimeout(async () => {
        let players: Player[] = await searchPlayerByName(newSearchTerm);

        setOptions(
          players.map((player: Player) => {
            return {
              value: player,
              label: player.firstName + " " + player.lastName
            };
          })
        );
      }, 300);
    },
    [searchPlayerByName]
  );

  const onTypeAheadOptionSelect = (
    selectedPlayer: ValueType<PlayerSearchOption, false>,
    _: ActionMeta<PlayerSearchOption>
  ) => {
    if (selectedPlayer) {
      setSelectedPlayer(selectedPlayer.value.id.toString());
    }
  };

  return (
    <AsyncSelect
      loadOptions={loadOptions}
      value={{
        value: {} as Player,
        label: "Search for player..."
      }}
      onChange={onTypeAheadOptionSelect}
      closeMenuOnSelect
      isClearable={false}
      isLoading={searchingPlayers}
      noOptionsMessage={_ => {
        return "No player found";
      }}
      loadingMessage={_ => "Searching..."}
      components={{
        DropdownIndicator: () => {
          return (
            <div style={{ margin: "4px 8px", display: "flex" }}>
              <GoSearch />
            </div>
          );
        },
        IndicatorSeparator: () => {
          return null;
        }
      }}
    />
  );
};

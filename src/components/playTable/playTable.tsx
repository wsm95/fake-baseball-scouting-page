import React from "react";
import { Play } from "../../interfaces/play";
import { Table, TableCellProps } from "rsuite";
import { Link } from "react-router-dom";
import { Player } from "../../interfaces/player";

interface TableColumn {
  id: number;
  pitcher: Player;
  batter: Player;
  pitch: number;
  swing: number;
  diff: number;
  result: string;
  score: string;
}

interface PlayTableProps {
  plays: Play[];
}

export const PlayTable = (props: PlayTableProps) => {
  const { plays } = props;

  const data = React.useMemo(() => {
    const inningsMap = plays.reduce(
      (acc: { [inning: string]: TableColumn[] }, p: Play) => {
        if (!acc[p.beforeState.inning]) {
          acc[p.beforeState.inning] = [];
        }

        acc[p.beforeState.inning].push({
          id: p.id,
          pitcher: p.pitcher,
          batter: p.batter,
          pitch: p.pitch,
          swing: p.swing,
          diff: p.diff,
          result: p.result,
          score: p.afterState.awayScore + "-" + p.afterState.homeScore
        });

        return acc;
      },
      {}
    );

    const inningTableColumns: any[] = [];
    Object.entries(inningsMap).forEach(([inning, plays], index) => {
      inningTableColumns.push({
        id: index,
        inning: inning,
        children: plays
      });
    });

    return inningTableColumns;
  }, [plays]);

  const LinkCell = (props: TableCellProps) => {
    const { rowData, dataKey } = props;

    const player = (rowData as TableColumn)[
      dataKey as keyof TableColumn
    ] as Player;

    if (player) {
      return (
        <Table.Cell {...props}>
          <Link to={`/player/${player.id}`}>
            {player.firstName + " " + player.lastName}
          </Link>
        </Table.Cell>
      );
    }

    return null;
  };

  return (
    <div>
      <Table isTree defaultExpandAllRows rowKey="id" data={data}>
        <Table.Column flexGrow={1}>
          <Table.HeaderCell>Inning</Table.HeaderCell>
          <Table.Cell dataKey="inning" />
        </Table.Column>

        <Table.Column flexGrow={1}>
          <Table.HeaderCell>Pitcher</Table.HeaderCell>
          <LinkCell dataKey="pitcher" />
        </Table.Column>

        <Table.Column flexGrow={1}>
          <Table.HeaderCell>Batter</Table.HeaderCell>
          <LinkCell dataKey="batter" />
        </Table.Column>

        <Table.Column flexGrow={1}>
          <Table.HeaderCell>Pitch</Table.HeaderCell>
          <Table.Cell dataKey="pitch" />
        </Table.Column>

        <Table.Column flexGrow={1}>
          <Table.HeaderCell>Swing</Table.HeaderCell>
          <Table.Cell dataKey="swing" />
        </Table.Column>

        <Table.Column flexGrow={1}>
          <Table.HeaderCell>Diff</Table.HeaderCell>
          <Table.Cell dataKey="diff" />
        </Table.Column>

        <Table.Column flexGrow={1}>
          <Table.HeaderCell>Result</Table.HeaderCell>
          <Table.Cell dataKey="result" />
        </Table.Column>

        <Table.Column flexGrow={1}>
          <Table.HeaderCell>Score</Table.HeaderCell>
          <Table.Cell dataKey="score" />
        </Table.Column>
      </Table>
    </div>
  );
};

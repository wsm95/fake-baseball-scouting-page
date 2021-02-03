import React from "react";
import { Play } from "../../interfaces/play";
import { Table } from "rsuite";

interface TableColumn {
  id: number;
  pitcher: string;
  batter: string;
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
          pitcher: p.pitcher.firstName + " " + p.pitcher.lastName,
          batter: p.batter.firstName + " " + p.batter.lastName,
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

  return (
    <div>
      <Table isTree defaultExpandAllRows rowKey="id" data={data}>
        <Table.Column flexGrow={1}>
          <Table.HeaderCell>Inning</Table.HeaderCell>
          <Table.Cell dataKey="inning" />
        </Table.Column>

        <Table.Column flexGrow={1}>
          <Table.HeaderCell>Pitcher</Table.HeaderCell>
          <Table.Cell dataKey="pitcher" />
        </Table.Column>

        <Table.Column flexGrow={1}>
          <Table.HeaderCell>Batter</Table.HeaderCell>
          <Table.Cell dataKey="batter" />
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

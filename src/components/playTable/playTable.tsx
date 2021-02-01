import React from "react";
import { Play } from "../../interfaces/play";
import { Table } from "rsuite";

interface PlayTableProps {
  plays: Play[];
}

export const PlayTable = (props: PlayTableProps) => {
  const { plays } = props;

  const data = React.useMemo(
    () =>
      plays.map((p: Play) => ({
        inning: p.beforeState.inning,
        pitcher: p.pitcher.firstName + " " + p.pitcher.lastName,
        batter: p.batter.firstName + " " + p.batter.lastName,
        pitch: p.pitch,
        swing: p.swing,
        diff: p.diff,
        result: p.result,
        score: p.afterState.awayScore + "-" + p.afterState.homeScore
      })),
    [plays]
  );

  return (
    <div>
      <Table
        isTree
        defaultExpandAllRows
        rowKey="id"
        height={400}
        data={data}
        // onExpandChange={(isOpen, rowData) => {
        //   console.log(isOpen, rowData);
        // }}
        renderTreeToggle={(icon, rowData) => {
          return icon;
        }}
      >
        <Table.Column>
          <Table.HeaderCell>Inning</Table.HeaderCell>
          <Table.Cell dataKey="inning" />
        </Table.Column>

        <Table.Column>
          <Table.HeaderCell>Pitcher</Table.HeaderCell>
          <Table.Cell dataKey="pitcher" />
        </Table.Column>

        <Table.Column>
          <Table.HeaderCell>Batter</Table.HeaderCell>
          <Table.Cell dataKey="batter" />
        </Table.Column>

        <Table.Column>
          <Table.HeaderCell>Pitch</Table.HeaderCell>
          <Table.Cell dataKey="pitch" />
        </Table.Column>

        <Table.Column>
          <Table.HeaderCell>Swing</Table.HeaderCell>
          <Table.Cell dataKey="swing" />
        </Table.Column>

        <Table.Column>
          <Table.HeaderCell>Diff</Table.HeaderCell>
          <Table.Cell dataKey="diff" />
        </Table.Column>

        <Table.Column>
          <Table.HeaderCell>Result</Table.HeaderCell>
          <Table.Cell dataKey="result" />
        </Table.Column>

        <Table.Column>
          <Table.HeaderCell>Score</Table.HeaderCell>
          <Table.Cell dataKey="score" />
        </Table.Column>
      </Table>
    </div>
  );
};

import React from "react";
import { useTable } from "react-table";
import { Play } from "../../interfaces/play";

interface TableProps {
  plays: Play[];
  awayTeamId: number;
}

export const Table = (props: TableProps) => {
  const { plays, awayTeamId } = props;
  console.log("awayTeamId", awayTeamId);
  const data = React.useMemo(
    () =>
      plays
        .filter((p: Play) => p.beforeState.inning[0] === `B`)
        .map((p: Play) => ({
          inning: p.beforeState.inning,
          pitcher: p.pitcher.firstName + " " + p.pitcher.lastName,
          batter: p.batter.firstName + " " + p.batter.lastName,
          pitch: p.pitch,
          swing: p.swing,
          diff: p.diff,
          result: p.result,
          score: p.afterState.awayScore + "-" + p.afterState.homeScore
        }))
        .reverse(),
    [plays]
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Pitches",
        columns: [
          {
            Header: "Inning",
            accessor: "inning"
          },
          {
            Header: "Pitcher",
            accessor: "pitcher"
          },
          {
            Header: "Batter",
            accessor: "batter"
          },
          {
            Header: "Pitch",
            accessor: "pitch"
          },
          {
            Header: "Swing",
            accessor: "swing"
          },
          {
            Header: "Diff",
            accessor: "diff"
          },
          {
            Header: "Result",
            accessor: "result"
          },
          {
            Header: "Score",
            accessor: "score"
          }
        ]
      }
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data });

  return (
    <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderBottom: "solid 3px red",
                  background: "aliceblue",
                  color: "black",
                  fontWeight: "bold"
                }}
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: "10px",
                      border: "solid 1px gray",
                      background: "papayawhip"
                    }}
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

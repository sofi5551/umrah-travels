"use client";

import { useState } from "react";

/**
 * Interactive column/row editor for a service page's pricing tables. Admin
 * fully controls column headers and row count/content. Serializes to two
 * hidden inputs (JSON-encoded `columns` and `rows`) so the enclosing
 * AdminForm's native submission carries the structured data to the server
 * action — no client-side fetch needed.
 */
export default function TableBlockBuilder({
  defaultColumns,
  defaultRows,
}: {
  defaultColumns?: string[];
  defaultRows?: string[][];
}) {
  const [columns, setColumns] = useState<string[]>(
    defaultColumns && defaultColumns.length > 0 ? defaultColumns : ["Vehicle", "Fare"]
  );
  const [rows, setRows] = useState<string[][]>(
    defaultRows && defaultRows.length > 0 ? defaultRows : [["", ""]]
  );

  function addColumn() {
    setColumns((c) => [...c, ""]);
    setRows((r) => r.map((row) => [...row, ""]));
  }

  function removeColumn(index: number) {
    if (columns.length <= 1) return;
    setColumns((c) => c.filter((_, i) => i !== index));
    setRows((r) => r.map((row) => row.filter((_, i) => i !== index)));
  }

  function addRow() {
    setRows((r) => [...r, columns.map(() => "")]);
  }

  function removeRow(index: number) {
    if (rows.length <= 1) return;
    setRows((r) => r.filter((_, i) => i !== index));
  }

  function setColumn(index: number, value: string) {
    setColumns((c) => c.map((col, i) => (i === index ? value : col)));
  }

  function setCell(rowIndex: number, colIndex: number, value: string) {
    setRows((r) =>
      r.map((row, i) => (i === rowIndex ? row.map((cell, j) => (j === colIndex ? value : cell)) : row))
    );
  }

  return (
    <div>
      <input type="hidden" name="columns" value={JSON.stringify(columns)} readOnly />
      <input type="hidden" name="rows" value={JSON.stringify(rows)} readOnly />

      <div className="themed-scrollbar overflow-x-auto border border-sandline">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead className="border-b border-sandline bg-sand">
            <tr>
              {columns.map((col, colIndex) => (
                <th key={colIndex} className="p-2">
                  <div className="flex items-center gap-1.5">
                    <input
                      value={col}
                      onChange={(e) => setColumn(colIndex, e.target.value)}
                      placeholder={`Column ${colIndex + 1}`}
                      className="input"
                    />
                    <button
                      type="button"
                      onClick={() => removeColumn(colIndex)}
                      disabled={columns.length <= 1}
                      className="shrink-0 px-1.5 text-stone hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label={`Remove column ${colIndex + 1}`}
                    >
                      ×
                    </button>
                  </div>
                </th>
              ))}
              <th className="p-2 align-middle">
                <button
                  type="button"
                  onClick={addColumn}
                  className="whitespace-nowrap text-xs font-medium text-ink hover:text-gold"
                >
                  + Column
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sandline">
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td key={colIndex} className="p-2">
                    <input
                      value={cell}
                      onChange={(e) => setCell(rowIndex, colIndex, e.target.value)}
                      className="input"
                    />
                  </td>
                ))}
                <td className="p-2">
                  <button
                    type="button"
                    onClick={() => removeRow(rowIndex)}
                    disabled={rows.length <= 1}
                    className="text-stone hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label={`Remove row ${rowIndex + 1}`}
                  >
                    ×
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        type="button"
        onClick={addRow}
        className="mt-2 text-xs font-medium text-ink hover:text-gold"
      >
        + Row
      </button>
    </div>
  );
}

import { DataGrid } from "@mui/x-data-grid";
import { Container } from "@mui/material";

import PropTypes from "prop-types";

function PlanetTable(props) {
  const { totalPlanets, rows, columns, onPageChange, isLoading } = props;

  return (
    <Container style={{ width: "auto", height: 400 }} spacing={0}>
      <DataGrid
        columns={columns}
        rows={rows}
        pageSize={10}
        rowCount={totalPlanets}
        paginationMode="server"
        rowsPerPageOptions={[10]}
        onPageChange={onPageChange}
        loading={isLoading}
        initialState={{
          sorting: {
            sortModel: [{ field: "name", sort: "asc" }],
          },
        }}
      />
    </Container>
  );
}

PlanetTable.propTypes = {
  totalPlanets: PropTypes.number.isRequired,
  rows: PropTypes.arrayOf(PropTypes.any).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  onPageChange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default PlanetTable;

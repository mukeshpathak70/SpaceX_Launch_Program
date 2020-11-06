export function spaceXLaunchAPI(http) {
  return {
    all: () => {
      return http.get('/v3/launches?limit=100');
    },

    getFilteredData: (launchStatus,landStatus,year) => {
      return http.get(`/v3/launches?limit=100&amp;launch_success=${launchStatus.toLowerCase()}&land_success=${landStatus.toLowerCase()}&launch_year=${year}`);
    }
  };
}

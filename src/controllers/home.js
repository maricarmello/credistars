module.exports = {
  dashboard: async (request, response) => {
    return response.view('home/dashboard');
  }
}

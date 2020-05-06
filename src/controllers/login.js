module.exports = {
    index: async (request, response) => {
      return response.view('login/index', null, {layout: false});
    }
  }
  
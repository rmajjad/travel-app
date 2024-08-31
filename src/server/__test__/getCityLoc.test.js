// getCityLoc.test.js
const axios = require("axios");
const { getCityLoc } = require("../getCityLoc.js");

jest.mock("axios");

describe("getCityLoc", () => {
    const username = process.env.NAME;  

    it("should return city data when a valid city name is provided", async () => {
        const mockCityData = {
            geonames: [
                {
                    name: "London",
                    countryName: "United Kingdom",
                    lat: "51.50853",
                    lng: "-0.12574"
                }
            ]
        };

        axios.get.mockResolvedValue({ data: mockCityData });

        const city = "London";
        const result = await getCityLoc(city, username);

        expect(result).toEqual(mockCityData.geonames[0]);
    });

    it("should return error message when an invalid city name is provided", async () => {
        const mockNoCityData = { geonames: [] };

        axios.get.mockResolvedValue({ data: mockNoCityData });

        const city = "InvalidCityName";
        const result = await getCityLoc(city, username);

        expect(result).toEqual({
            message: "wrong city name!",
            error: true
        });
    });
});

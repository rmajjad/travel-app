const axios = require("axios");
const { getCityLoc } = require("../getCityLoc.js");

jest.mock("axios");

describe("getCityLoc", () => {
    const username = process.env.NAME;  

    it("should return city data when a valid city name is provided", async () => {
        const mockCityData = {
            postalCodes: [
                {
                    placeName: "London",
                    lat: "51.50853",
                    lng: "-0.12574"
                }
            ]
        };

        axios.get.mockResolvedValue({ data: mockCityData });

        const city = "London";
        const result = await getCityLoc(city, username);

        expect(result).toEqual({
            lat: "51.50853",
            lng: "-0.12574",
            city: "London"
        });
    });

    it("should return error message when an invalid city name is provided", async () => {
        const mockNoCityData = { postalCodes: [] };

        axios.get.mockResolvedValue({ data: mockNoCityData });

        const city = "InvalidCityName";
        const result = await getCityLoc(city, username);

        expect(result).toEqual({
            message: "wrong city name!",
            error: true
        });
    });
});

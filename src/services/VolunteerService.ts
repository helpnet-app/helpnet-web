import { VolunteerToCreateDto } from "../dtos/volunteer/VolunteerToCreateDto";
import { Volunteer } from "../entities/Volunteer";

export default class VolunteerService {
  async create(data: VolunteerToCreateDto): Promise<Volunteer> {
    console.log(data);

    const response = await fetch(
      `https://helpnet-api-1.onrender.com/volunteers`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const responseJSON = await response.json();
    console.log(responseJSON);
    const responseStatus = response.status;
    if (responseStatus !== 201) throw new Error(responseJSON.message);
    return responseJSON;
  }

  async findById(id_vol: string): Promise<Volunteer> {
    const response = await fetch(
      `https://helpnet-api-1.onrender.com/volunteers/${id_vol}`
    );
    const responseJSON = await response.json();
    const responseStatus = response.status;
    if (responseStatus !== 200) throw new Error(responseJSON.message);
    return responseJSON;
  }
}

import { OrganizationToCreateDto } from "../dtos/organization/OrganizationToCreateDto";
import { Org } from "../entities/Org";

export default class OrgService {
  async create(data: OrganizationToCreateDto): Promise<Org> {
    const response = await fetch(
      `https://helpnet-api-1.onrender.com/organizations`,
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
    const responseStatus = response.status;
    if (responseStatus !== 201) throw new Error(responseJSON.message);
    return responseJSON;
  }

  async findById(id_org: string): Promise<Org> {
    const response = await fetch(
      `https://helpnet-api-1.onrender.com/organizations/${id_org}`
    );
    const responseJSON = await response.json();
    const responseStatus = response.status;
    if (responseStatus !== 200) throw new Error(responseJSON.message);
    return responseJSON;
  }
}

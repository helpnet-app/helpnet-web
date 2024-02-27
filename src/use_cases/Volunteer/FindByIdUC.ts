import { Volunteer } from "../../entities/Volunteer";
import VolunteerService from "../../services/VolunteerService";


export class FindVolById {
  constructor(private readonly volunteerService: VolunteerService) {}

  async execute(id_vol: string): Promise<Volunteer | null> {
    return this.volunteerService.findById(id_vol);
  }
}

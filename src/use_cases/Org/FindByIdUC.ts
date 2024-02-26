import { Org } from "../../entities/Org";
import OrgService from "../../services/OrgService";


export class FindOrgById {
  constructor(private readonly orgService: OrgService) {}

  async execute(user_id: string): Promise<Org | null> {
    return this.orgService.findById(user_id);
  }
}

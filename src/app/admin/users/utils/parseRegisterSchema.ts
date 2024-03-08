import { IMG_URL } from "@/constants/constants";
import { getImageFileFromUrl } from "@/lib/utils/getImageFileFromUrl";
import { User } from "@/models/user.model";
import dayjs from "dayjs";
import { RegisterSchema } from "../context/registerFormContext";

export async function parseRegisterSchema(user: User): Promise<RegisterSchema> {
  const avatarUrl = `${IMG_URL}/${user.person.avatar}`;
  // await getImageFileFromUrl(avatarUrl)
  return {
    user: {
      userID: user.userID,
      email: user.email,
      password: "********"
    },
    person: {
      personID: user.person.personID,
      firstName: user.person.firstName,
      middleName: user.person.middleName,
      lastNames: user.person.lastNames,
      dni: user.person.dni,
      avatar: await getImageFileFromUrl(avatarUrl)
    },
    personInfo: {
      address: user.person.personInfo.address,
      birthDate: dayjs(user.person.personInfo.birthDate).toDate(),
      ethnicID: user.person.personInfo.ethnic.ethnicID,
      genderID: user.person.personInfo.gender.genderID,
      maritalStatusID: user.person.personInfo.maritalStatus.maritalStatusID,
      phone: user.person.personInfo.phone,
      personID: user.person.personID
    },
    hasDisability: user.person.personDisability.length > 0,
    personDisability: user.person.personDisability[0]
      ? {
          personDisabilityID: user.person.personDisability[0].personDisabilityID,
          disabilityID: user.person.personDisability[0].disability.disabilityID,
          personID: user.person.personID,
          percentage: user.person.personDisability[0].percentage
        }
      : undefined,
    roleID: user.userRole[0].role.roleID
  };
}

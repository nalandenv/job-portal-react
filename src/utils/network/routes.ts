import { GetRequest } from "."
import { isObjEmpty } from "../common";
import { PROFILES_URL } from "./config";

export const getCandidates = async () => {
    const response = await GetRequest(PROFILES_URL);
    return (Array.isArray(response))? response: [];
}
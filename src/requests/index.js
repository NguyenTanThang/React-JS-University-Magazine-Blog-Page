import axios from "axios";
import {PROXY_URL} from "../config";

export const getAllContributions = async () => {
    try {
        const res = await axios.get(`${PROXY_URL}/contributions`);
        const data = res.data;

        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getContributionByID = async (contributionID) => {
    try {
        const res = await axios.get(`${PROXY_URL}/contributions/contributionID/${contributionID}`);
        const data = res.data;

        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}
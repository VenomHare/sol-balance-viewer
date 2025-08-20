import axios from "axios"

const SERVER = "http://localhost:3000"

export interface WalletBalance {
    wallet_id: string,
    sol: number,
    lamports: number
}

export const getBalanceData = async (pub_id: string) => {
    try {

        const dataReq = await axios.post(`${SERVER}/balance`, {
            pub_id
        });
        const data : WalletBalance = dataReq.data;
        return data;
    }
    catch (err) {
        console.log("Error while getting balance\n", err);
        const errMessage = (err as any).message;
        if (errMessage) {
            alert(errMessage);
        }
    }


}
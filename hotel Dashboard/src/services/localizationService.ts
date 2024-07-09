import { create } from "zustand";
import ILocalization from "../types/ILocalization";


const localizationService = create<ILocalization>((set) => ({
    isRight: false,
    changeDirection: (state: boolean) => {
        set({ isRight: state })
    }
}))

export default localizationService;
export class ActivePhonePlans {

    id: number;
    phonePlanType: number;
    price: number = 0;
    planName: string = "";
    deviceLimit: number = 2;

    constructor(id: number, phonePlanType: number) {
        this.id = id;
        this.phonePlanType = phonePlanType;
        if (phonePlanType == 1) {
            this.price = 30;
            this.planName = "5G Unlimited";
        }
        else if (phonePlanType == 2) {
            this.price = 40;
            this.planName = "6G Limited";
        }
        else if (phonePlanType == 3) {
            this.price = 45;
            this.planName = "6G Unlimited Plus";
            this.deviceLimit = 3;
        }
        else if (phonePlanType == 4) {
            this.price = 50;
            this.planName = "Family Plan";
            this.deviceLimit = 6;
        }
        else if (phonePlanType == 5) {
            this.price = 55;
            this.planName = "Deluxe Family Plan";
            this.deviceLimit = 7;
        }
    }

}

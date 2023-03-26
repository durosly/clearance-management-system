import fs from "fs";
import CollegeModel from "../models/college";
import DepartmentModel from "../models/department";
import SessionModel from "../models/session";

export function uniqueFilename(filename, newFilename) {
    const fileExtension = filename.split(".").pop();
    const uniqueName = Math.random().toString(36).substring(2, 15);
    return `${newFilename}${uniqueName}.${fileExtension}`;
}

export const saveFile = async (file, folder) => {
    const newFileName = uniqueFilename(file.originalFilename, file.newFilename);
    const data = fs.readFileSync(file.filepath);
    const currentDir = process.cwd();
    // console.log(currentDir);

    const basePath = `${currentDir}/public/${folder}/`;

    try {
        if (!fs.existsSync(basePath)) {
            fs.mkdirSync(basePath);
        }
    } catch (err) {
        console.error(err);
        return false;
    }

    const uploadPath = `${basePath}${newFileName}`;

    // console.log(uploadPath);

    fs.writeFileSync(uploadPath, data);
    fs.unlinkSync(file.filepath);
    return newFileName;
};

export const stringifyDoc = (doc) => {
    return JSON.parse(JSON.stringify(doc));
};

export async function getFullPaymentsData(payments) {
    const data = [];

    for (const pay of payments) {
        const newPay = await getFullPaymentData(pay);

        data.push(newPay);
    }

    return data;
}

export async function getFullPaymentData(pay) {
    const newPay = {};
    if (pay._collegeId !== "all") {
        const college = await CollegeModel.findById(pay._collegeId);
        newPay.college = college.name;
    } else {
        newPay.college = "all";
    }

    if (pay._departmentId !== "all") {
        const dept = await DepartmentModel.findById(pay._collegeId);
        newPay.department = dept.name;
    } else {
        newPay.department = "all";
    }

    // const session = await SessionModel.findById(pay._sessionId);
    newPay.session = pay.sessionInfo;
    newPay._id = pay._id;
    newPay.title = pay.title;
    newPay.amount = pay.amount;

    return newPay;
}

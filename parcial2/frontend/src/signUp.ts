import { SignUpController } from "./controller/SignUpController.js";
import { SignUpView } from "./view/SignUpView.js";
import { SignUpModel } from "./model/SignUpModel.js";

const signUp = new SignUpController(new SignUpView(), new SignUpModel());
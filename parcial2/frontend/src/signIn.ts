import { SignInController } from "./controller/SignInController.js";
import { SignInView } from "./view/SignInView.js";
import { SignInModel } from "./model/SignInModel.js";

const signIn = new SignInController(new SignInView(), new SignInModel());
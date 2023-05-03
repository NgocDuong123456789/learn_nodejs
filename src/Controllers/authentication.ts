import { createUser, getUserByEmail } from "../db/users";
import express from "express";
import { random, authentication } from "../helper/index";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) return res.status(400).json("email chưa có")

    const existringUser = await (
      await getUserByEmail(email)
    )
    // .isSelected("+authentication.salt +authentication.passowrd");
    if (existringUser) return res.status(400).json("email đã tồn tại");

    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });
    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const salt = random();
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json("email không có");


    const user = await getUserByEmail(email).select('+authentication.salt +authentication.password'); 
    // select() để cho phép lấy cả salt và password của người dùng từ csdl lấy ra để xác thực
    if (!user) return res.status(400).json("email không đúng");
    
    const expecteMash = authentication(user.authentication.salt, password);
    if (user.authentication.password !== expecteMash) return res.status(403).json("mật khẩu nhập không đúng");
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );

    await user.save();
    res.cookie("Antonio-auth", user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
      httpOnly:true
    });
    
    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};

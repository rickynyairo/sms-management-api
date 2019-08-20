import { Request, Response, NextFunction } from "express";
import { userModel } from "../auth/models";
import { postModel } from "./models";
import { Post } from "./interfaces";

export class PostController {
  posts!: any;
  constructor() {
    this.posts = postModel;
  }

  getAllPosts = async (_request: Request, response: Response) => {
    const posts = await this.posts
      .find()
      .populate("author", "userName")
      .exec();
    return response.status(200).send(posts);
  };

  getPostById = async (request: Request, response: Response) => {
    const { id } = request.params;
    const post = await this.posts.findById(id).exec();
    return response.status(200).send(post);
  };

  modifyPost = async (request: Request, response: Response) => {
    const { id } = request.params;
    const postData: Post = request.body;
    this.posts
      .findByIdAndUpdate(id, postData, { new: true })
      .then((post: any) => response.send(post));
  };

  createAPost = async (request: Request, response: Response) => {
    const post: Post = request.body;
    const createdPost = new postModel({
      ...post,
      author: request.user._id
    });
    const savedPost = await createdPost.save();
    await savedPost.populate("author", "userName").execPopulate();
    return response.status(201).send(savedPost);
  };

  deletePost = (request: Request, response: Response) => {
    const { id } = request.params;
    this.posts.findByIdAndDelete(id).then((successResponse: any) => {
      return successResponse ? response.send(200) : response.send(404);
    });
  };
}


export class ReportController {
  user!: any;
  constructor() {
    this.user = userModel;
  }
  generateReport = async (
    _request: Request,
    response: Response,
    _next: NextFunction
  ) => {
    const usersByCities = await this.user.aggregate([
      {
        $match: {
          "address.city": {
            $exists: true,
          },
        },
      },
      {
        $group: {
          _id: {
            city: "$address.city"
          },
          users: {
            $push: {
              userName: "$userName",
              _id: "$_id"
            }
          },
          count: {
            $sum: 1
          }
        }
      },
      {
        $lookup: {
          from: "posts",
          localField: "users._id",
          foreignField: "author",
          as: "articles",
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "users._id",
          foreignField: "_id",
          as: "users",
        }
      },
      {
        $addFields: {
          amountOfArticles: {
            $size: "$articles"
          },
        },
      },
      {
        $sort: {
          amountOfArticles: -1,
        },
      }
    ]);
    return response.send({
      usersByCities
    });
  };
}


import { GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInputObjectType, GraphQLInputField, GraphQLBoolean } from "graphql";
import { Context } from "./context";

export const TaskType: GraphQLObjectType = new GraphQLObjectType({
    name: "Task",
    description: "This represents a Task.",
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        authorId: { type: GraphQLInt },
        title: { type: GraphQLNonNull(GraphQLString) },
        completed: { type: GraphQLNonNull(GraphQLBoolean) },
        author: {
            type: UserType,
            resolve: (parent, args, ctx) => {
                return ctx.prisma.user.findUnique({
                    where: {
                        id: parent.authorId
                    }
                })
            }
        }
    })
})

export const UserType: GraphQLObjectType = new GraphQLObjectType({
    name: "User",
    description: "This represents a User.",
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        tasks: {
            type: GraphQLList(TaskType),
            resolve: (parent, args, ctx) => {
                return ctx.prisma.task.findMany({
                    where: {
                        authorId: parent.id
                    }
                })
            }
        }
    })
})



export const RootQueryType = new GraphQLObjectType({
    name: "Query",
    description: "Root Query",
    fields: () => ({
        // Get all users.
        users: {
            type: GraphQLList(UserType),
            description: "List of all Users.",
            resolve: (_parent: any, _args: any, ctx: Context) => ctx.prisma.user.findMany()
        },
        tasks: {
            type: GraphQLList(TaskType),
            description: "List of all Tasks.",
            resolve: (_parent: any, _args: any, ctx: Context) => ctx.prisma.task.findMany()
        },
        // Get user by ID.
        user: {
            type: UserType,
            description: "Get user by ID.",
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) },
            },
            resolve: (_, args, ctx) => ctx.prisma.user.findUnique({
                where: {
                    id: args.id
                }
            })
        },
        hello: {
            type: GraphQLString,
            description: "hello world",
            resolve: () => "world"
        }
    })
})

export const RootMutationType = new GraphQLObjectType({
    name: "Mutation",
    description: "Root Mutation",
    fields: () => ({
        createUser: {
            type: UserType,
            description: "Create a new User.",
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: (parent: any, args: any, ctx: Context) => ctx.prisma.user.create({
                data: { name: args.name, email: args.email }
            })
        },
        deleteUser: {
            type: UserType,
            description: "Delete an User.",
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) },
            },
            resolve: (parent: any, args: any, ctx: Context) => ctx.prisma.user.delete({
                where: {
                    id: args.id
                }
            })
        },
        updateUser: {
            type: UserType,
            description: "Edit an existing User.",
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) },
                name: { type: GraphQLString },
                email: { type: GraphQLString },
            },
            resolve: (parent: any, args: any, ctx: Context) => ctx.prisma.user.update({
                where: {
                    id: args.id
                },
                data: { name: args.name, email: args.email }
            })
        },
        createTask: {
            type: TaskType,
            description: "Create a new Task.",
            args: {
                title: { type: GraphQLNonNull(GraphQLString) },
                authorId: { type: GraphQLNonNull(GraphQLInt) },
            },
            resolve: (parent, args, ctx) => ctx.prisma.task.create({
                data: { title: args.title, authorId: args.authorId, completed: false }
            })
        },
        updateTask: {
            type: UserType,
            description: "Edit an existing Task.",
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) },
                completed: { type: GraphQLBoolean },
                authorId: { type: GraphQLInt },
                title: { type: GraphQLString },
            },
            resolve: (parent: any, args: any, ctx: Context) => ctx.prisma.task.update({
                where: {
                    id: args.id
                },
                data: { completed: args.completed, authorId: args.authorId, title: args.title }
            })
        },
        deleteTask: {
            type: TaskType,
            description: "Delete a Task.",
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) },
            },
            resolve: (parent: any, args: any, ctx: Context) => ctx.prisma.task.delete({
                where: {
                    id: args.id
                }
            })
        },
    })
})

export const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType,
})

import graphene
from graphene_sqlalchemy import SQLAlchemyObjectType, SQLAlchemyConnectionField
from models.user import User as UserModel
from database import db

class User(SQLAlchemyObjectType):
    class Meta:
        model = UserModel
        interfaces = (graphene.relay.Node, )

class CreateUser(graphene.Mutation):
    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)
    
    user = graphene.Field(lambda: User)
    
    def mutate(self, info, username, password):
        user = UserModel(username=username, password=password)
        db.session.add(user)
        db.session.commit()
        return CreateUser(user=user)

class UserLogin(graphene.Mutation):  # new UserLogin mutation
    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)

    success = graphene.Boolean()
    user = graphene.Field(lambda: User)
    message = graphene.String()

    def mutate(self, info, username, password):
        user = UserModel.query.filter_by(username=username, password=password).first()
        if user is None:
            return UserLogin(success=False, message="No user found with the provided credentials")
        return UserLogin(success=True, user=user, message="Login successful")

class Query(graphene.ObjectType):
    node = graphene.relay.Node.Field()

class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()
    user_login = UserLogin.Field()  # include UserLogin in Mutation

schema = graphene.Schema(query=Query, mutation=Mutation)

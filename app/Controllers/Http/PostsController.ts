import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class PostController {
  public async index(_ctx: HttpContextContract) {
    return [
      {
        id: 1,
        title: 'Hello world',
      },
      {
        id: 2,
        title: 'Hello universe',
      },
    ]
  }
}

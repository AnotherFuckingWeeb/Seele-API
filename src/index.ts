import { App } from './app';

async function Main() : Promise<void> {
    const app = new App(4000);
    await app.Listen();
}

Main();
import * as lg from '../src'
import CFG from './setup.private'

import {expect, jest, test} from '@jest/globals';

async function getConfiguration(): Promise<lg.Configuration> {
    const oauth = new lg.OAuthClient(CFG.oauth);

    const cfg = new lg.Configuration({
        basePath: CFG.basePath,
        accessToken: oauth.getToken()
    });

    return cfg;
}

test("Récupère un texte du fond CNIL en fonction de son Ancien ID", async () => {
    const request = {
        "ancienId": "MCN97020008A"
    };

    const cfg = await getConfiguration();
    const api = new lg.ConsultControllerApi(cfg);
    const text = (await api.getCnilWithAncienIdUsingPOST(request)).data?.text;
    expect(text.id).toBe("CNILTEXT000017653865");
})

test("Permet de récupérer l'ensemble des tables annuelles pour une période donnée", async () => {
    const request = {
        "endYear": 2017,
        "startYear": 2012
    };

    const cfg = await getConfiguration();
    const api = new lg.ConsultControllerApi(cfg);
    const table = (await api.getTablesUsingPOST(request)).data.tables;
    expect(table.length).toBeGreaterThan(0);
});

test("Récupère un article par son identifiant Eli ou Alias", async () => {
    const request = {
        "idEliOrAlias": "/eli/decret/2021/7/13/PRMD2117108D/jo/article_1"
    };
    
    const cfg = await getConfiguration();
    const api = new lg.ConsultControllerApi(cfg);
    const article = api.getArticleWithIdEliOrAliasUsingPOST(request);
})

test("Recupère le contenu d'un article", async () => {
    const id = "LEGIARTI000006307920";

    const cfg = await getConfiguration();
    const api = new lg.ConsultControllerApi(cfg);
    const article = (await api.getArticleUsingPOST({id})).data.article!;
    
    expect(article.id).toBe(id);
})
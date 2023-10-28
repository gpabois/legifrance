import ClientOAuth2 from 'client-oauth2'

export interface OAuthConfiguration {
    clientId: string,
    clientSecret: string,
    authorizationUri: string,
    accessTokenUri: string
};

export class OAuthClient {
    auth: ClientOAuth2;
    constructor(cfg: OAuthConfiguration) {
        this.auth = new ClientOAuth2(cfg)
    }

    async getToken(): Promise<string> {
        return (await this.auth.credentials.getToken()).accessToken
    }
};
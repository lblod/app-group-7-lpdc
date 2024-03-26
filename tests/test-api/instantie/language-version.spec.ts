import {expect, test} from "@playwright/test";
import {dispatcherUrl} from "../test-helpers/test-options";
import {loginAsPepingen, loginAsPepingenButRemoveLPDCRightsFromSession, pepingenId} from "../test-helpers/login";
import {PublicServiceTestBuilder} from "../test-helpers/public-service.test-builder";
import {Language} from "../test-helpers/language";

test('When publicService has title NL then getPublicServiceLanguageVersion should return NL', async ({request}) => {
    const loginResponse = await loginAsPepingen(request);

    const instance = await PublicServiceTestBuilder.aPublicService()
        .withTitle('Instance title', Language.NL)
        .withDescription('Instance description', Language.NL)
        .buildAndPersist(request, pepingenId);

    const response = await request.get(`${dispatcherUrl}/lpdc-management/public-services/${encodeURIComponent(instance.getId().getValue())}/dutch-language-version`, {headers: {cookie: loginResponse.cookie}});
    expect(response.ok(), `ERROR: ${await response.text()}`).toBeTruthy();
    const actual = await response.json();

    expect(actual).toEqual({languageVersion: Language.NL});
});


test('When publicService has title NL and EN then getPublicServiceLanguageVersion should return NL', async ({request}) => {
    const loginResponse = await loginAsPepingen(request);

    const instance = await PublicServiceTestBuilder.aPublicService()
        .withTitles([{value: 'Instance title', language: Language.NL}, {value: 'Instance title', language: Language.EN}])
        .withDescription('Instance description', Language.NL)
        .buildAndPersist(request, pepingenId);

    const response = await request.get(`${dispatcherUrl}/lpdc-management/public-services/${encodeURIComponent(instance.getId().getValue())}/dutch-language-version`, {headers: {cookie: loginResponse.cookie}});
    expect(response.ok(), `ERROR: ${await response.text()}`).toBeTruthy();
    const actual = await response.json();

    expect(actual).toEqual({languageVersion: Language.NL});
});

test('getPublicServiceLanguageVersion returns http 401 Unauthorized without login', async ({request}) => {
    const instance = await PublicServiceTestBuilder.aPublicService()
        .withTitles([{value: 'Instance title', language: Language.NL}, {value: 'Instance title', language: Language.EN}])
        .withDescription('Instance description', Language.NL)
        .buildAndPersist(request, pepingenId);

    const response = await request.get(`${dispatcherUrl}/lpdc-management/public-services/${encodeURIComponent(instance.getId().getValue())}/dutch-language-version`, {headers: {cookie: undefined}});
    expect(response.status()).toEqual(401);
});

test('getPublicServiceLanguageVersion returns http 403 Forbidden with a user that has no access rights', async ({request}) => {
    const loginResponse = await loginAsPepingenButRemoveLPDCRightsFromSession(request);
    const instance = await PublicServiceTestBuilder.aPublicService()
        .withTitles([{value: 'Instance title', language: Language.NL}, {value: 'Instance title', language: Language.EN}])
        .withDescription('Instance description', Language.NL)
        .buildAndPersist(request, pepingenId);

    const response = await request.get(`${dispatcherUrl}/lpdc-management/public-services/${encodeURIComponent(instance.getId().getValue())}/dutch-language-version`, {headers: {cookie: loginResponse.cookie}});
    expect(response.status()).toEqual(403);
});
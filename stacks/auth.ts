import { Config, StackContext } from 'sst/constructs'

export function Auth({ stack }: StackContext) {
	const CLERK_PUBLISHABLE_KEY = new Config.Parameter(
		stack,
		'CLERK_PUBLISHABLE_KEY',
		{
			value: 'pk_test_Z29vZC1ob3JuZXQtMzcuY2xlcmsuYWNjb3VudHMuZGV2JA',
		}
	)
	const CLERK_PUBLIC_KEY = new Config.Parameter(stack, 'CLERK_PUBLIC_KEY', {
		value: `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtH00ZJAwW9C6sbMX82le
T5M0PozGjqV4uM5Db5/vHo9jFlb68e/hlJy1C4qcG0nQS9bmyJKyi86+gYzKu6nT
IKWfMt2v6xB2Blq9M+pF42b3jBaDI8+lnLwIXkTTab0O4eAk3jKG1IyhunixbN6L
/9k8RvDWKU88vw8UB2kc3K1yDtGtylE2xPJqm3OHFNGxBpXzA9mcLydbuvJkWvx1
ueFsaPYyQfYi309i+wQcaZmGDyAjAD4dMrcvcVfrKFIYbpGanyc+Yexo3B8Rw27N
rdprb/q+/dmxeVOUCS8DjM7xiCh9GZOHE0amzUsPQqu6B+RDF42yQT25lnOCM5a5
RwIDAQAB
-----END PUBLIC KEY-----`,
	})

	return {
		CLERK_PUBLISHABLE_KEY,
		CLERK_PUBLIC_KEY,
	}
}

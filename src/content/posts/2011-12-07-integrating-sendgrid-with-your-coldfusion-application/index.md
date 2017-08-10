---
title: "Integrating SendGrid With Your ColdFusion Application"
date: '2011-12-07T14:23:33.000Z'
comments: true
path: "/blog/integrating-sendgrid-with-your-coldfusion-application"
published: true
---
The majority of my day today was spent evaluating [SendGrid](http://sendgrid.com/) and fiddling around with the API. For those of you unfamiliar with SendGrid, it's a hosted e-mail delivery service. At the very (very!) basic level, they provide a mailserver that you can use for your application. Of course, it's much more than that - the reason I was looking into it today is because we need a solid e-mail provider for e-mail newsletters for our clients. Currently, we are using an incredibly outdated version of Lyris List Manager and it's right about time that we replace it. Now, SendGrid doesn't provide any list management, that will have to be done in the application. What I'm about to show you is how to interface with SendGrid to send (potentially) copious amounts of e-mail very, very easily.

<!-- more -->

### Getting Started

Your first step is to sign up for an account. Luckily for us, SendGrid offers a free plan that allows you to send up to 200 e-mails per day - perfect for our testing environment! You can find the sign-up link at the very bottom of their [product pricing page](http://sendgrid.com/pricing.html). Once you sign up, it will take a few minutes before they get you up and running because they apparently verify each account by hand. I'm not sure if this is actually true, but that's what they say.

Once you're set up, you can start using their service right away if you want. Just plug the SMTP settings into your mail client or CF application and you'll be eating away at those precious 200-daily e-mails. But we want to do something more interesting...

### The Fun Stuff

SendGrid will allow you to send mail in three ways - normal SMTP, the Web API, and the SMTP API. We're going to be using the Web API for this demonstration, but the SMTP API is very, very similar.

X-SMTPAPI is where the real fun stuff comes into play. It's a JSON-encoded associative array that is inserted as a custom header in the SMTP API and as a URL parameter in the Web API. The array can contain any of the following keys(pulled from the [documentation](http://docs.sendgrid.com/documentation/api/smtp-api/developers-guide/)):

 - "to" - An address or list of addresses for the message to be sent to.
 - "sub" - An associative array of substitution tags, where each tag is associated with a list of replacement text for the tag in the body text. Each Substitution value corresponds to an email in the “To” section of the JSON string. Yah, it's mail merge.
 - "section" - Sections can be used to simplify substitution values that are common to many recipients. This is an associative array of sections that can be used in substitution values.
 - "category" - Associates the category of email this should be logged as. You may insert up to 10 categories as an array, these categories are not predefined.
 - "unique_args" - An associative array of arguments and their values to be applied to all emails sent in this SMTP API transaction.
 - "filter" - An associative array of filters and their settings, used to override filter settings already setup for your account. Settings are an associative array of the setting names and their values.

SendGrid offers a few examples of code to build this JSON string in Perl, PHP, Python, and Ruby. I'm most familiar with PHP, so I went ahead and grabbed the [PHP version](http://docs.sendgrid.com/documentation/api/smtp-api/php-example/) and started converting it. I ended up with the following code, which works fine in my testing but has not yet been tested in a production setting - so use it at your own risk!

```java
component {
	

	public smtpApiHeader function init() {
		variables.data = {};

		return this;
	}

	public void function addTo( required addresses ) {

		if( !isDefined( 'variables.data.to' ) ) {
			variables.data['to'] = [];
		}
		
		if( isArray( arguments.addresses ) ) {
			variables.data.to = arrayMerge( arguments.addresses, variables.data.to );
		} else {
			arrayAppend( variables.data.to, arguments.addresses );
		}

	}

	public void function addSubVal( required string key, required array values ) {

		if( !isDefined( 'variables.data.sub' ) ) {
			variables.data['sub'] = {};
		}
		
		if( !isArray( 'variables.data.sub["#arguments.key#"]' ) ){
			variables.data.sub["#arguments.key#"] = [];
		}

		variables.data.sub["#arguments.key#"] = arrayMerge( variables.data.sub["#arguments.key#"], arguments.values  );

	}

	public void function setUniqueArgs( required struct values ) {
		
		variables.data['unique_args'] = arguments.values;

	}

	public void function setCategory( required string category ) {
		
		variables.data['category'] = arguments.category;

	}

	public void function addFilterSetting( filter, setting, value ) {
		
		if( !isDefined( 'variables.data.filters' ) ) {
			variables.data['filters'] = {};
		}

		if( !isStruct( 'variables.data.filters["#arguments.filter#"]' ) ) {
			variables.data['filters']["#arguments.filter#"] = {};
		}

		if( !isStruct( 'variables.data.filters["#arguments.filter#"]["settings"]' ) ) {
			variables.data['filters']["#arguments.filter#"]['settings'] = {};
		}

		variables.data['filters']["#arguments.filter#"]['settings']["#arguments.setting#"] = arguments.value;

	}

	/**
	 *	Appends array2 to the bottom of array1
	 */
	private array function arrayMerge( required array array1, required array array2  ) {
		var i = '';

		for( i = 1; i LTE arrayLen( arguments.array2 ); i++ ) {
			arrayAppend( arguments.array1, arguments.array2[i] );
		}

		return arguments.array1;
	}

	public string function asJSON() {
		var json = serializeJSON( variables.data );

		// Adds spaces so that if the string wraps, data isn't broken.
		json = reReplace( json, '(["\]}])([,:])(["\[{])', '\1\2 \3', 'all' );

		return json;
	}

	public string function asString() {
		var json = asJSON();
		var str = 'X-SMTPAPI: ' & wrap( json, 76 );

		return str;
	}

}
```

Now that we have the hard stuff out of the way, I'm going to put together a simple form and processing page that will take a comma delimited list of e-mail addresses and a comma delimited list of user names and then send out a batch e-mail via SendGrid's Web API.

```html
<!DOCTYPE HTML>
<html lang="en-US">
<head>
	<meta charset="UTF-8">
	<title>SendGrid Demo</title>
</head>
<body>
	<form action="process.cfm" method="POST">
		<div>
			<label for="emails">
				E-mail Address(es)
				<input type="text" name="emails" id="emails" />
			</label>
		</div>
		<div>
			<label for="subs">
				Real Name(s)
				<input type="text" name="subs" id="subs" />
			</label>
		</div>
		<div>
			<label for="subject">
				Subject Line
				<input type="text" name="subject" id="subject" />
			</label>
		</div>
		<div>
			<label for="body">
				Body Text
				<textarea name="body" id="body"></textarea>
			</label>
		</div>
		<div>
			<input type="submit" value="Send!" />
		</div>
	</form>
</body>
</html>
```

Yah, it's an ugly form but it gets what we need. So, onward! Time to process the data from this form, translate it into a JSON string, and then ship it off to SendGrid.

```java
api = new smtpApiHeader();

// Convert our lists into arrays
addresses = listToArray( form.emails );
names = listToArray( form.subs );

// Add our e-mail addresses to the JSON string
api.addTo( addresses );

// Add our substitutions to the JSON string
// SendGrid will look for %name% in our e-mail
// and replace it with the appropriate value
api.addSubVal( '%name%', names );

// Create our HTTP service so that we can send
// this to the Web API
httpSvc = new http();
httpSvc.setUrl( 'https://sendgrid.com/api/mail.send.json' );

// Add params containg the information we need to send

// This is the JSON string that smtpApiHeader built for us
httpSvc.addParam( name = 'x-smtpapi', value = api.asJSON(), type = 'url' );

// The "to" address appears to be ignored if there is a "to" 
// array in x-smtpapi. I just set it to the same value as the
// "from address"
httpSvc.addParam( name = 'to', value = 'your@email.com', type = 'url' );
httpSvc.addParam( name = 'from', value = 'your@email.com', type = 'url' );
httpSvc.addParam( name = 'subject', value = form.subject, type = 'url' );

// We could also specify HTML content here by adding another
// param named "html"
httpSvc.addParam( name = 'text', value = form.body, type = 'url' );

// Your api_user and api_key are your SendGrid username and password
httpSvc.addParam( name = 'api_user', value = 'YOUR_API_USER', type = 'url' );
httpSvc.addParam( name = 'api_key', value = 'YOUR_API_KEY', type = 'url' );

// Send our request!
httpResult = httpSvc.send().getPrefix();
```

As you can see, this is a really simple process and I've only just begun to scratch the surface.

Once again - I need to stress that none of this has been tested in production, so use my code at your own risk! You can grab the full source on my Gist at https://gist.github.com/1445942

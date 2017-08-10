---
title: "Programmatically Creating New Datasource in Coldfusion"
date: '2013-03-20T14:23:15.000Z'
comments: true
path: "/blog/programmatically-creating-new-datasource-in-coldfusion"
published: true
---
I got a new laptop at work. Awesome, right? This thing is blazing fast and a huge upgrade. Unfortunately, I needed to set up my entire local development environment all over again. I managed it with some quick and dirty batch scripts, but I was still left with the tedious task of creating datasources for each of the 40ish MySQL databases that I had imported. Each datasource entry is identical except for the database name, so I figured there must be a better way of doing it than manually creating each entry. Sure enough, there is...

<!-- more -->

The ColdFusion administrator offers a pretty nice [API](http://help.adobe.com/en_US/ColdFusion/9.0/Admin/WSc3ff6d0ea77859461172e0811cbf364104-7fcf.html) that you can interact with to do things such as create mappings, manage debug settings, and a plethora of other stuff. Of course, you can also create datasources with it and it is dead simple to do. For my method to work, you do have to have at least one existing datasource, but I'm sure you could just create that programmatically as well.

The code below uses the SHOW DATABASES command to get a list of all MySQL databases, and then creates a datasource for each. It will create datasources for stuff like information_schema and performance_schema, so you will have to manually delete those if you don't want them.

```html
<!--- Plug in an existing datasource --->
<cfquery name="qDatabases" datasource="YOUR_DSN_HERE">
SHOW DATABASES;
</cfquery>

<!--- Log in to the CF admin with your password --->
<cfset adminAPI = createObject( 'component', 'cfide.adminapi.administrator' ) />
<cfset adminAPI.login( 'YOUR_PASSWORD_HERE' ) />

<!--- Loop over our query and create datasources for each database in MySQL --->
<cfloop query="qDatabases">

	<cfscript>
	dsnAPI = createObject( 'component', 'cfide.adminapi.datasource' );

	// Create a struct that contains all the information for the
	// datasource. Most of the keys are self explanatory, but I
	// had trouble finding the one for the connection string setting.
	// Turns out that the key is "args"
	dsn = {
		driver = 'mysql5',
		name = '#database#',
		host = 'localhost',
		port = '3306',
		database = '#database#',
		username = 'YOUR_MYSQL_USERNAME',
		password = 'YOUR_MYSQL_PASSWORD',
		args = 'allowMultiQueries=true'
	};

	// Finally, we save the new datasource
	dsnAPI.setMySQL5( argumentCollection = dsn );
	</cfscript>

</cfloop>
```

This isn't really something that I'll be using all that frequently, but I figured I'd share it in case anyone else wanted to save themselves half an hour of setting up datasources.

create table users(
	id serial,
	name varchar,
	password varchar,
	age int
)

create table history(
	id serial,
	user_id int,
	description varchar,
	date timestamp
)

CREATE OR REPLACE PROCEDURE public.createlog(user_id int, description varchar)
LANGUAGE 'sql'
AS $BODY$
		insert into history(user_id, description, date)
			values (user_id, description, NOW())
	
$BODY$;

create or replace procedure updateUser(id int,
									   name varchar,
									   password varchar, age int)
	language sql
	as $$
		UPDATE users as u SET 
		name = u2.name,
		age = u2.age,
		password = u2.password 
		from 
		(values
		(id, name, age, password)
		)
		as u2(id, name, age, password) where u2.id = u.id;
	$$;
	
	call updateUser(1, 'ALEK', '213123', 41)


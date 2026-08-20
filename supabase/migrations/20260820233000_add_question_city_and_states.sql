alter table public.questions
  add column if not exists city text not null default '';

alter table public.questions
  add constraint questions_city_length_check
  check (char_length(city) between 2 and 100) not valid;

alter table public.questions
  validate constraint questions_city_length_check;

insert into public.states (code, name, is_active) values
  ('AL','Alabama',true), ('AK','Alaska',true), ('AZ','Arizona',true), ('AR','Arkansas',true),
  ('CA','California',true), ('CO','Colorado',true), ('CT','Connecticut',true), ('DE','Delaware',true),
  ('FL','Florida',true), ('GA','Georgia',true), ('HI','Hawaii',true), ('ID','Idaho',true),
  ('IL','Illinois',true), ('IN','Indiana',true), ('IA','Iowa',true), ('KS','Kansas',true),
  ('KY','Kentucky',true), ('LA','Louisiana',true), ('ME','Maine',true), ('MD','Maryland',true),
  ('MA','Massachusetts',true), ('MI','Michigan',true), ('MN','Minnesota',true), ('MS','Mississippi',true),
  ('MO','Missouri',true), ('MT','Montana',true), ('NE','Nebraska',true), ('NV','Nevada',true),
  ('NH','New Hampshire',true), ('NJ','New Jersey',true), ('NM','New Mexico',true), ('NY','New York',true),
  ('NC','North Carolina',true), ('ND','North Dakota',true), ('OH','Ohio',true), ('OK','Oklahoma',true),
  ('OR','Oregon',true), ('PA','Pennsylvania',true), ('RI','Rhode Island',true), ('SC','South Carolina',true),
  ('SD','South Dakota',true), ('TN','Tennessee',true), ('TX','Texas',true), ('UT','Utah',true),
  ('VT','Vermont',true), ('VA','Virginia',true), ('WA','Washington',true), ('WV','West Virginia',true),
  ('WI','Wisconsin',true), ('WY','Wyoming',true)
on conflict (code) do update set name = excluded.name, is_active = true;

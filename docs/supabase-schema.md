# Supabase Schema Draft

This is a pre-connection schema plan for moving the current MyBoogi mock data into Supabase. Names use snake_case table names, while the app can keep camelCase TypeScript adapters.

## users
- Fields: `id`, `name`, `type`, `location`, `level`, `level_name`, `xp`, `next_level_xp`, `trust_score`, `created_at`
- Relations: referenced by posts, comments, turtles, favorites, follows, notifications, reports, banners, breeder_applications, user_settings
- RLS direction: users can read public profile fields; users can update only their own profile.

## breeders
- Fields: `id`, `user_id`, `name`, `badge`, `breeder_type`, `verification_badge_label`, `logo`, `banner_image`, `short_bio`, `full_bio`, `specialty`, `region`, `career_years`, `joined_at`, `trust_score`, `rating`
- Relations: `user_id -> users.id`
- RLS direction: public read; owner can update; admin can moderate.

## listings
- Fields: `id`, `breeder_id`, `title`, `species`, `price`, `location`, `sex`, `stage`, `size`, `hatch_date`, `description`, `images`, `verified`, `listing_status`, `review_eligible`, `created_at`
- Relations: `breeder_id -> breeders.id`
- RLS direction: public read active listings; breeder owner can create/update; admin can hide.

## posts
- Fields: `id`, `user_id`, `category`, `title`, `content`, `images`, `views`, `likes`, `created_at`
- Relations: `user_id -> users.id`
- RLS direction: authenticated users can create; author can update/delete; admin can moderate.

## comments
- Fields: `id`, `post_id`, `user_id`, `content`, `likes`, `created_at`
- Relations: `post_id -> posts.id`, `user_id -> users.id`
- RLS direction: public read; authenticated users can create; author/admin can moderate.

## turtles
- Fields: `id`, `user_id`, `name`, `species`, `sex`, `image`, `birth_date`, `created_at`
- Relations: `user_id -> users.id`
- RLS direction: owner-only read/write by default; optional public sharing later.

## growth_records
- Fields: `id`, `turtle_id`, `date`, `weight`, `shell_length`, `image`, `memo`, `food_response`, `bowel_movement`, `condition`
- Relations: `turtle_id -> turtles.id`
- RLS direction: owner can manage through turtle ownership.

## reviews
- Fields: `id`, `breeder_id`, `listing_id`, `user_id`, `rating`, `content`, `review_type`, `status`, `report_count`, `created_at`
- Relations: `breeder_id -> breeders.id`, `listing_id -> listings.id`, `user_id -> users.id`
- RLS direction: public read active reviews; author can create/update pending review; admin can hide.

## favorites
- Fields: `id`, `user_id`, `listing_id`, `created_at`
- Relations: `user_id -> users.id`, `listing_id -> listings.id`
- RLS direction: users can read/write only their own favorites.

## follows
- Fields: `id`, `user_id`, `breeder_id`, `created_at`
- Relations: `user_id -> users.id`, `breeder_id -> breeders.id`
- RLS direction: users can read/write only their own follows; aggregate counts can be public.

## contact_logs
- Fields: `id`, `user_id`, `breeder_id`, `listing_id`, `contact_type`, `contacted_at`
- Relations: `user_id -> users.id`, `breeder_id -> breeders.id`, `listing_id -> listings.id`
- RLS direction: user and breeder owner can read relevant logs; admin can audit disputes.

## notifications
- Fields: `id`, `user_id`, `type`, `title`, `message`, `target_type`, `target_id`, `read`, `created_at`
- Relations: `user_id -> users.id`
- RLS direction: users can read/update only their own notifications.

## reports
- Fields: `id`, `reporter_id`, `target_type`, `target_id`, `reason`, `status`, `created_at`
- Relations: `reporter_id -> users.id`
- RLS direction: authenticated users can create; only reporter/admin can read; admin can update status.

## banners
- Fields: `id`, `title`, `description`, `image`, `action_label`, `link_url`, `is_active`, `is_ad`, `sort_order`, `start_date`, `end_date`, `created_by`
- Relations: `created_by -> users.id`
- RLS direction: public read active banners; admin-only create/update.

## breeder_applications
- Fields: `id`, `user_id`, `breeder_type`, `breeder_name`, `region`, `specialties`, `introduction`, `status`, `applied_at`
- Relations: `user_id -> users.id`
- RLS direction: applicant can create/read own application; admin can review/update.

## user_settings
- Fields: `user_id`, `notification_enabled`, `comment_notification`, `like_notification`, `follow_notification`, `listing_notification`, `breeder_notification`, `notice_notification`, `updated_at`
- Relations: `user_id -> users.id`
- RLS direction: users can read/update only their own settings.

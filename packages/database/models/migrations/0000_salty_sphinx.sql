CREATE TABLE `chats` (
	`id` text PRIMARY KEY NOT NULL,
	`chatName` text
);
--> statement-breakpoint
CREATE TABLE `friendRequests` (
	`id` text PRIMARY KEY NOT NULL,
	`senderId` text,
	`receiverId` text,
	`status` text,
	FOREIGN KEY (`senderId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`receiverId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `friends` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text,
	`friendId` text,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`friendId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` text PRIMARY KEY NOT NULL,
	`content` text,
	`createdAt` text,
	`chatId` text,
	`senderId` text,
	FOREIGN KEY (`chatId`) REFERENCES `chats`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`senderId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text,
	`message` text,
	`createdAt` text,
	`friendRequestsId` text,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`friendRequestsId`) REFERENCES `friendRequests`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `userChats` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text,
	`chatId` text,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`chatId`) REFERENCES `chats`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`email` text,
	`picture` text,
	`createdAt` text DEFAULT (CURRENT_TIMESTAMP),
	`updatedAt` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `friendRequests_receiverId_unique` ON `friendRequests` (`receiverId`);--> statement-breakpoint
CREATE UNIQUE INDEX `messages_chatId_unique` ON `messages` (`chatId`);--> statement-breakpoint
CREATE UNIQUE INDEX `messages_senderId_unique` ON `messages` (`senderId`);--> statement-breakpoint
CREATE UNIQUE INDEX `notifications_friendRequestsId_unique` ON `notifications` (`friendRequestsId`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_id_unique` ON `users` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);
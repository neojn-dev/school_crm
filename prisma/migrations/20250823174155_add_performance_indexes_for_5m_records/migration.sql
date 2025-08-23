-- CreateIndex
CREATE INDEX `Doctor_userId_isActive_idx` ON `Doctor`(`userId`, `isActive`);

-- CreateIndex
CREATE INDEX `Doctor_createdAt_idx` ON `Doctor`(`createdAt`);

-- CreateIndex
CREATE INDEX `Doctor_department_idx` ON `Doctor`(`department`);

-- CreateIndex
CREATE INDEX `Doctor_specialization_idx` ON `Doctor`(`specialization`);

-- CreateIndex
CREATE INDEX `Doctor_userId_department_isActive_idx` ON `Doctor`(`userId`, `department`, `isActive`);

-- CreateIndex
CREATE INDEX `Doctor_firstName_lastName_idx` ON `Doctor`(`firstName`, `lastName`);

-- CreateIndex
CREATE INDEX `Doctor_email_idx` ON `Doctor`(`email`);

-- CreateIndex
CREATE INDEX `Engineer_userId_isActive_idx` ON `Engineer`(`userId`, `isActive`);

-- CreateIndex
CREATE INDEX `Engineer_createdAt_idx` ON `Engineer`(`createdAt`);

-- CreateIndex
CREATE INDEX `Engineer_department_idx` ON `Engineer`(`department`);

-- CreateIndex
CREATE INDEX `Engineer_specialization_idx` ON `Engineer`(`specialization`);

-- CreateIndex
CREATE INDEX `Engineer_engineeringType_idx` ON `Engineer`(`engineeringType`);

-- CreateIndex
CREATE INDEX `Engineer_userId_department_isActive_idx` ON `Engineer`(`userId`, `department`, `isActive`);

-- CreateIndex
CREATE INDEX `Engineer_firstName_lastName_idx` ON `Engineer`(`firstName`, `lastName`);

-- CreateIndex
CREATE INDEX `Engineer_email_idx` ON `Engineer`(`email`);

-- CreateIndex
CREATE INDEX `Lawyer_userId_isActive_idx` ON `Lawyer`(`userId`, `isActive`);

-- CreateIndex
CREATE INDEX `Lawyer_createdAt_idx` ON `Lawyer`(`createdAt`);

-- CreateIndex
CREATE INDEX `Lawyer_department_idx` ON `Lawyer`(`department`);

-- CreateIndex
CREATE INDEX `Lawyer_practiceArea_idx` ON `Lawyer`(`practiceArea`);

-- CreateIndex
CREATE INDEX `Lawyer_userId_department_isActive_idx` ON `Lawyer`(`userId`, `department`, `isActive`);

-- CreateIndex
CREATE INDEX `Lawyer_firstName_lastName_idx` ON `Lawyer`(`firstName`, `lastName`);

-- CreateIndex
CREATE INDEX `Lawyer_email_idx` ON `Lawyer`(`email`);

-- CreateIndex
CREATE INDEX `Teacher_userId_isActive_idx` ON `Teacher`(`userId`, `isActive`);

-- CreateIndex
CREATE INDEX `Teacher_createdAt_idx` ON `Teacher`(`createdAt`);

-- CreateIndex
CREATE INDEX `Teacher_department_idx` ON `Teacher`(`department`);

-- CreateIndex
CREATE INDEX `Teacher_userId_department_isActive_idx` ON `Teacher`(`userId`, `department`, `isActive`);

-- CreateIndex
CREATE INDEX `Teacher_firstName_lastName_idx` ON `Teacher`(`firstName`, `lastName`);

-- CreateIndex
CREATE INDEX `Teacher_email_idx` ON `Teacher`(`email`);

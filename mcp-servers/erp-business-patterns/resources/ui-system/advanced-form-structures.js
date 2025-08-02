export const advancedFormStructures = {
  name: "Advanced Form Structures",
  description: "Complex form patterns including VLWR 5-toggle sections, TLWR conditional fields, responsive layouts, and sophisticated form state management for enterprise ERP applications",
  
  overview: {
    purpose: "Enable complex form structures with conditional rendering, dynamic sections, and advanced state management",
    useCase: "VLWR forms with multiple toggle sections, TLWR forms with conditional fields, complex configuration forms",
    keyFeatures: [
      "VLWR 5-toggle sections pattern with conditional validation",
      "TLWR conditional fields and responsive panel layouts",
      "Complex form state management with dynamic schema validation",
      "Advanced toggle section patterns with persistent state",
      "Responsive layout adaptation for complex conditional forms",
      "Multi-section form coordination and data synchronization"
    ]
  },

  vlwrToggleSectionsPattern: {
    description: "VLWR form with 5 main toggle sections and sophisticated conditional rendering",
    
    stateManagement: `
// VLWR Form State Management
const [toggleStates, setToggleStates] = useState({
  clientPanels: false,
  saltFogTest: false,
  impactTest: false,
  adhesionTest: false,
  customTests: false
});

// Persistent state handler
const handleToggleChange = (section: string, value: boolean) => {
  setToggleStates(prev => ({
    ...prev,
    [section]: value
  }));
  
  // Clear related fields when toggling off
  if (!value) {
    clearSectionFields(section);
  }
};

// Clear fields when section is disabled
const clearSectionFields = (section: string) => {
  const fieldsToReset = getSectionFields(section);
  fieldsToReset.forEach(field => {
    form.setValue(field, '');
  });
};

const getSectionFields = (section: string): string[] => {
  const fieldMap = {
    clientPanels: ['clientSteelPanel', 'clientAluminumPanel', 'panelPreparation'],
    saltFogTest: ['saltFogHours', 'saltFogStandard', 'saltFogConditions'],
    impactTest: ['impactEnergy', 'impactStandard', 'impactPosition'],
    adhesionTest: ['adhesionMethod', 'adhesionStandard', 'adhesionCriteria'],
    customTests: ['customTestName', 'customTestDescription', 'customTestStandard']
  };
  return fieldMap[section] || [];
};`,

    mainToggleInterface: `
{/* VLWR Step 2: Testing Requirements with 5 Toggle Sections */}
{currentStep === 1 && requestType === 'VLWR' && (
  <div className="space-y-6">
    {/* Main Form Fields (always visible) */}
    <Card>
      <CardHeader>
        <CardTitle>{t('material_testing_requirements')}</CardTitle>
      </CardHeader>
      <CardContent className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        {/* Following field organization pattern */}
        <FormField
          control={form.control}
          name='materialToTest'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('material_to_test')}</FormLabel>
              <FormControl>
                <Input {...field} placeholder={t('enter_material_name')} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='sampleId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('sample_id')}</FormLabel>
              <FormControl>
                <Input {...field} placeholder="VLWR-2024-001" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='supplier'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('supplier')}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t('select_supplier')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {SUPPLIERS.map((supplier) => (
                    <SelectItem key={supplier.value} value={supplier.value}>
                      {supplier.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>

    {/* Toggle Sections Control Panel */}
    <Card>
      <CardHeader>
        <CardTitle>{t('additional_testing_options')}</CardTitle>
        <CardDescription>
          {t('select_additional_tests_description')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {/* Toggle 1: Client Panels */}
          <div className='flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent/50 transition-colors'>
            <Switch
              id='client-panels'
              checked={toggleStates.clientPanels}
              onCheckedChange={(value) => handleToggleChange('clientPanels', value)}
            />
            <div className='flex-1'>
              <Label htmlFor='client-panels' className='text-sm font-medium'>
                {t('client_panel_testing')}
              </Label>
              <p className='text-xs text-muted-foreground mt-1'>
                {t('test_on_client_provided_panels')}
              </p>
            </div>
          </div>

          {/* Toggle 2: Salt Fog Test */}
          <div className='flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent/50 transition-colors'>
            <Switch
              id='salt-fog-test'
              checked={toggleStates.saltFogTest}
              onCheckedChange={(value) => handleToggleChange('saltFogTest', value)}
            />
            <div className='flex-1'>
              <Label htmlFor='salt-fog-test' className='text-sm font-medium'>
                {t('salt_fog_test')}
              </Label>
              <p className='text-xs text-muted-foreground mt-1'>
                {t('corrosion_resistance_testing')}
              </p>
            </div>
          </div>

          {/* Toggle 3: Impact Test */}
          <div className='flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent/50 transition-colors'>
            <Switch
              id='impact-test'
              checked={toggleStates.impactTest}
              onCheckedChange={(value) => handleToggleChange('impactTest', value)}
            />
            <div className='flex-1'>
              <Label htmlFor='impact-test' className='text-sm font-medium'>
                {t('impact_resistance_test')}
              </Label>
              <p className='text-xs text-muted-foreground mt-1'>
                {t('mechanical_impact_testing')}
              </p>
            </div>
          </div>

          {/* Toggle 4: Adhesion Test */}
          <div className='flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent/50 transition-colors'>
            <Switch
              id='adhesion-test'
              checked={toggleStates.adhesionTest}
              onCheckedChange={(value) => handleToggleChange('adhesionTest', value)}
            />
            <div className='flex-1'>
              <Label htmlFor='adhesion-test' className='text-sm font-medium'>
                {t('adhesion_test')}
              </Label>
              <p className='text-xs text-muted-foreground mt-1'>
                {t('coating_adhesion_evaluation')}
              </p>
            </div>
          </div>

          {/* Toggle 5: Custom Tests */}
          <div className='flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent/50 transition-colors'>
            <Switch
              id='custom-tests'
              checked={toggleStates.customTests}
              onCheckedChange={(value) => handleToggleChange('customTests', value)}
            />
            <div className='flex-1'>
              <Label htmlFor='custom-tests' className='text-sm font-medium'>
                {t('custom_tests')}
              </Label>
              <p className='text-xs text-muted-foreground mt-1'>
                {t('special_testing_requirements')}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Conditional Sections Rendering */}
    {toggleStates.clientPanels && (
      <ClientPanelSection form={form} />
    )}

    {toggleStates.saltFogTest && (
      <SaltFogTestSection form={form} />
    )}

    {toggleStates.impactTest && (
      <ImpactTestSection form={form} />
    )}

    {toggleStates.adhesionTest && (
      <AdhesionTestSection form={form} />
    )}

    {toggleStates.customTests && (
      <CustomTestsSection form={form} />
    )}
  </div>
)}`,

    conditionalSections: `
// Section Components with Field Organization Pattern

const ClientPanelSection = ({ form }) => (
  <Card>
    <CardHeader>
      <CardTitle>{t('client_panel_testing')}</CardTitle>
      <CardDescription>
        {t('specify_client_provided_panel_requirements')}
      </CardDescription>
    </CardHeader>
    <CardContent className='grid grid-cols-1 gap-4 md:grid-cols-2'>
      {/* Boolean fields grouped together */}
      <div className='space-y-3'>
        <FormField
          control={form.control}
          name='clientSteelPanel'
          render={({ field }) => (
            <FormItem className='flex flex-row items-center space-x-3 space-y-0'>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>{t('client_steel_panel')}</FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='clientAluminumPanel'
          render={({ field }) => (
            <FormItem className='flex flex-row items-center space-x-3 space-y-0'>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>{t('client_aluminum_panel')}</FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='clientZincPanel'
          render={({ field }) => (
            <FormItem className='flex flex-row items-center space-x-3 space-y-0'>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>{t('client_zinc_panel')}</FormLabel>
            </FormItem>
          )}
        />
      </div>

      {/* Select field */}
      <FormField
        control={form.control}
        name='panelPreparation'
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('panel_preparation')}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t('select_preparation_method')} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="degreased">{t('degreased_only')}</SelectItem>
                <SelectItem value="sandblasted">{t('sandblasted')}</SelectItem>
                <SelectItem value="chromated">{t('chromated')}</SelectItem>
                <SelectItem value="phosphated">{t('phosphated')}</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Textarea spans full width */}
      <div className='md:col-span-2'>
        <FormField
          control={form.control}
          name='panelSpecialInstructions'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('panel_special_instructions')}</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder={t('panel_preparation_notes')}
                  className="resize-none"
                  rows={2}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </CardContent>
  </Card>
);

const SaltFogTestSection = ({ form }) => (
  <Card>
    <CardHeader>
      <CardTitle>{t('salt_fog_test_specification')}</CardTitle>
      <CardDescription>
        {t('corrosion_resistance_test_parameters')}
      </CardDescription>
    </CardHeader>
    <CardContent className='grid grid-cols-1 gap-4 md:grid-cols-2'>
      {/* Number fields first */}
      <FormField
        control={form.control}
        name='saltFogHours'
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('test_duration_hours')}</FormLabel>
            <FormControl>
              <Input {...field} type="number" placeholder="500" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='saltFogTemperature'
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('test_temperature_celsius')}</FormLabel>
            <FormControl>
              <Input {...field} type="number" placeholder="35" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Select fields */}
      <FormField
        control={form.control}
        name='saltFogStandard'
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('test_standard')}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t('select_standard')} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="astm_b117">ASTM B117</SelectItem>
                <SelectItem value="iso_9227">ISO 9227</SelectItem>
                <SelectItem value="jis_z2371">JIS Z2371</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='saltFogEvaluation'
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('evaluation_method')}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t('select_evaluation')} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="visual">Visual Inspection</SelectItem>
                <SelectItem value="rating_scale">Rating Scale</SelectItem>
                <SelectItem value="both">Both Methods</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Textarea spans full width */}
      <div className='md:col-span-2'>
        <FormField
          control={form.control}
          name='saltFogNotes'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('test_specific_notes')}</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder={t('salt_fog_test_requirements')}
                  className="resize-none"
                  rows={2}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </CardContent>
  </Card>
);`
  },

  tlwrConditionalFields: {
    description: "TLWR form with sophisticated conditional field rendering and responsive panel layouts",
    
    conditionalRenderingLogic: `
// TLWR Conditional Fields Logic
const [conditionalStates, setConditionalStates] = useState({
  hasDescription: false,
  requiresCustomPanel: false,
  needsSpecialHandling: false
});

// Watch form values for conditional rendering
const requestType = form.watch('requestType');
const chemistry = form.watch('chemistry');
const testObjective = form.watch('testObjective');
const supplierProvided = form.watch('supplierProvided');

// Dynamic field visibility based on selections
const showDescriptionField = useMemo(() => {
  return testObjective === 'custom' || chemistry === 'special';
}, [testObjective, chemistry]);

const showCustomPanelSection = useMemo(() => {
  return !supplierProvided && chemistry !== 'standard';
}, [supplierProvided, chemistry]);`,

    responsivePanelLayout: `
{/* TLWR Step 2: Advanced Conditional Layout */}
{currentStep === 1 && requestType === 'TLWR' && (
  <div className="space-y-6">
    {/* Main Testing Requirements */}
    <Card>
      <CardHeader>
        <CardTitle>{t('testing_requirements')}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Responsive grid that adapts to content */}
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
          {/* Left Panel: Basic Requirements */}
          <div className='space-y-4'>
            {/* Number fields first */}
            <FormField
              control={form.control}
              name='sampleQuantity'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('sample_quantity')}</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" placeholder="5" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Text field */}
            <FormField
              control={form.control}
              name='supplierName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('supplier_name')}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={t('enter_supplier')} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Select fields */}
            <FormField
              control={form.control}
              name='chemistry'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('chemistry_type')}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('select_chemistry')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="polyester">Polyester</SelectItem>
                      <SelectItem value="epoxy">Epoxy</SelectItem>
                      <SelectItem value="acrylic">Acrylic</SelectItem>
                      <SelectItem value="special">Special Chemistry</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='testObjective'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('test_objective')}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('select_objective')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="quality_control">Quality Control</SelectItem>
                      <SelectItem value="r_and_d">R&D Testing</SelectItem>
                      <SelectItem value="troubleshooting">Troubleshooting</SelectItem>
                      <SelectItem value="custom">Custom Objective</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Boolean field */}
            <FormField
              control={form.control}
              name='supplierProvided'
              render={({ field }) => (
                <FormItem className='flex flex-row items-center space-x-3 space-y-0'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>{t('supplier_provided_sample')}</FormLabel>
                </FormItem>
              )}
            />
          </div>

          {/* Right Panel: Conditional Content */}
          <div className='space-y-4'>
            {/* Conditional Description Field */}
            {showDescriptionField && (
              <div className='animate-in slide-in-from-right-2 duration-200'>
                <FormField
                  control={form.control}
                  name='customDescription'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('detailed_description')}</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder={t('describe_special_requirements')}
                          className="resize-none"
                          rows={4}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Conditional Custom Panel Section */}
            {showCustomPanelSection && (
              <div className='animate-in slide-in-from-right-2 duration-200'>
                <Card className='border-dashed'>
                  <CardHeader className='pb-3'>
                    <CardTitle className='text-base'>{t('custom_panel_requirements')}</CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-3'>
                    <FormField
                      control={form.control}
                      name='panelMaterial'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('panel_material')}</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={t('select_material')} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="steel">Steel</SelectItem>
                              <SelectItem value="aluminum">Aluminum</SelectItem>
                              <SelectItem value="zinc">Zinc</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name='panelSize'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('panel_dimensions')}</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="10x15 cm" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Always-visible notes field */}
            <FormField
              control={form.control}
              name='testingNotes'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('testing_notes')}</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder={t('additional_testing_requirements')}
                      className="resize-none"
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Conditional Full-Width Sections */}
    {chemistry === 'special' && (
      <Card className='animate-in slide-in-from-bottom-2 duration-300'>
        <CardHeader>
          <CardTitle>{t('special_chemistry_details')}</CardTitle>
          <CardDescription>
            {t('provide_detailed_information_for_special_chemistry')}
          </CardDescription>
        </CardHeader>
        <CardContent className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <FormField
            control={form.control}
            name='specialChemistryType'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('chemistry_specification')}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder={t('describe_chemistry_type')} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='chemistrySupplier'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('chemistry_supplier')}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder={t('supplier_name')} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='md:col-span-2'>
            <FormField
              control={form.control}
              name='specialRequirements'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('special_handling_requirements')}</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder={t('describe_special_requirements')}
                      className="resize-none"
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>
    )}
  </div>
)}`
  },

  complexStateManagement: {
    description: "Advanced form state management patterns for dynamic validation and field coordination",
    
    dynamicSchemaValidation: `
// Dynamic Schema Validation Based on Form State
const createDynamicSchema = (formData: Partial<FormValues>) => {
  const baseSchema = z.object({
    // Base fields always required
    requestType: z.enum(['LWR', 'TLWR', 'VLWR']),
    laboratory: z.string().min(1, 'Laboratory is required'),
    customer: z.string().min(1, 'Customer is required'),
  });

  let conditionalFields = {};

  // VLWR-specific validation
  if (formData.requestType === 'VLWR') {
    conditionalFields = {
      materialToTest: z.string().min(1, 'Material to test is required'),
      sampleId: z.string().min(1, 'Sample ID is required'),
      
      // Conditional validation based on toggle states
      ...(formData.clientPanels && {
        panelPreparation: z.string().min(1, 'Panel preparation is required'),
      }),
      
      ...(formData.saltFogTest && {
        saltFogHours: z.number().min(1, 'Test duration is required'),
        saltFogStandard: z.string().min(1, 'Test standard is required'),
      }),
      
      ...(formData.impactTest && {
        impactEnergy: z.number().min(1, 'Impact energy is required'),
        impactStandard: z.string().min(1, 'Impact standard is required'),
      }),
      
      ...(formData.adhesionTest && {
        adhesionMethod: z.string().min(1, 'Adhesion method is required'),
      }),
      
      ...(formData.customTests && {
        customTestName: z.string().min(1, 'Custom test name is required'),
        customTestDescription: z.string().min(10, 'Test description required'),
      }),
    };
  }

  // TLWR-specific validation
  if (formData.requestType === 'TLWR') {
    conditionalFields = {
      testObjective: z.string().min(1, 'Test objective is required'),
      chemistry: z.string().min(1, 'Chemistry is required'),
      
      // Conditional validation based on chemistry selection
      ...(formData.chemistry === 'special' && {
        specialChemistryType: z.string().min(1, 'Special chemistry type required'),
        specialRequirements: z.string().min(10, 'Special requirements required'),
      }),
      
      // Conditional validation based on supplier provision
      ...(!formData.supplierProvided && {
        panelMaterial: z.string().min(1, 'Panel material is required'),
        panelSize: z.string().min(1, 'Panel size is required'),
      }),
    };
  }

  return baseSchema.extend(conditionalFields);
};

// Use dynamic schema in form
const form = useForm<FormValues>({
  resolver: zodResolver(createDynamicSchema(formData)),
  mode: 'onChange',
  reValidateMode: 'onChange',
});

// Update schema when form state changes
useEffect(() => {
  const currentData = form.getValues();
  const newSchema = createDynamicSchema(currentData);
  
  // Re-validate with new schema
  form.trigger();
}, [form.watch('requestType'), form.watch('chemistry'), toggleStates]);`,

    fieldCoordination: `
// Field Coordination and Data Synchronization
const useFormCoordination = (form: UseFormReturn<FormValues>) => {
  // Coordinate related fields
  const coordinateFields = useCallback(() => {
    const values = form.getValues();
    
    // Auto-fill related fields based on selections
    if (values.chemistry === 'polyester' && !values.cureTemperature) {
      form.setValue('cureTemperature', '200');
      form.setValue('cureTime', '20');
    }
    
    if (values.chemistry === 'epoxy' && !values.cureTemperature) {
      form.setValue('cureTemperature', '160');
      form.setValue('cureTime', '30');
    }
    
    // Clear incompatible selections
    if (values.requestType === 'VLWR' && values.targetSalesPrice) {
      form.setValue('targetSalesPrice', '');
    }
    
    // Sync toggle states with form fields
    if (values.clientPanels && !values.panelPreparation) {
      // Ensure required fields are highlighted
      form.trigger(['panelPreparation']);
    }
  }, [form]);

  // Watch for field changes that require coordination
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (['chemistry', 'requestType'].includes(name)) {
        coordinateFields();
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form, coordinateFields]);

  return { coordinateFields };
};`,

    persistentState: `
// Persistent State Management
const useFormPersistence = (formId: string) => {
  const STORAGE_KEY = \`form_state_\${formId}\`;
  
  // Save form state to localStorage
  const saveFormState = useCallback((data: any) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.warn('Failed to save form state:', error);
    }
  }, [STORAGE_KEY]);
  
  // Load form state from localStorage
  const loadFormState = useCallback(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.warn('Failed to load form state:', error);
      return null;
    }
  }, [STORAGE_KEY]);
  
  // Clear saved state
  const clearFormState = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
  }, [STORAGE_KEY]);
  
  return { saveFormState, loadFormState, clearFormState };
};

// Use in form component
const { saveFormState, loadFormState, clearFormState } = useFormPersistence('commercial-request');

// Auto-save form state
useEffect(() => {
  const subscription = form.watch((data) => {
    // Debounce saves
    const timeoutId = setTimeout(() => {
      saveFormState({ ...data, toggleStates });
    }, 1000);
    
    return () => clearTimeout(timeoutId);
  });
  
  return () => subscription.unsubscribe();
}, [form, saveFormState, toggleStates]);

// Load on mount
useEffect(() => {
  const savedState = loadFormState();
  if (savedState) {
    // Restore form values
    Object.keys(savedState).forEach(key => {
      if (key !== 'toggleStates') {
        form.setValue(key, savedState[key]);
      }
    });
    
    // Restore toggle states
    if (savedState.toggleStates) {
      setToggleStates(savedState.toggleStates);
    }
  }
}, [form, loadFormState]);`
  },

  multiSectionCoordination: {
    description: "Coordination patterns for forms with multiple interconnected sections",
    
    sectionDependencies: `
// Section Dependencies and Cross-Section Validation
const useSectionCoordination = () => {
  const [sectionStates, setSectionStates] = useState({
    basicInfo: { completed: false, valid: false },
    testing: { completed: false, valid: false },
    conditions: { completed: false, valid: false },
    files: { completed: false, valid: false }
  });
  
  // Validate section completion
  const validateSection = useCallback(async (sectionName: string, form: UseFormReturn) => {
    const sectionFields = getSectionFields(sectionName);
    const isValid = await form.trigger(sectionFields);
    const values = form.getValues();
    
    // Check if all required fields are filled
    const isCompleted = sectionFields.every(field => {
      const value = values[field];
      return value !== undefined && value !== '' && value !== null;
    });
    
    setSectionStates(prev => ({
      ...prev,
      [sectionName]: { completed: isCompleted, valid: isValid }
    }));
    
    return { completed: isCompleted, valid: isValid };
  }, []);
  
  // Cross-section validation rules
  const validateCrossSections = useCallback((formData: FormValues) => {
    const issues = [];
    
    // Example: If custom tests are selected, files section becomes required
    if (formData.customTests && !formData.attachedFiles?.length) {
      issues.push({
        section: 'files',
        field: 'attachedFiles',
        message: 'Files are required for custom tests'
      });
    }
    
    // Example: If special chemistry, detailed description required
    if (formData.chemistry === 'special' && !formData.specialRequirements) {
      issues.push({
        section: 'testing',
        field: 'specialRequirements',
        message: 'Special requirements must be specified'
      });
    }
    
    return issues;
  }, []);
  
  return { sectionStates, validateSection, validateCrossSections };
};`,

    progressTracking: `
// Progress Tracking Component
const FormProgressTracker = ({ sectionStates, currentSection }) => {
  const sections = [
    { id: 'basicInfo', name: 'Basic Information', icon: Info },
    { id: 'testing', name: 'Testing Requirements', icon: TestTube },
    { id: 'conditions', name: 'Conditions & Notes', icon: FileText },
    { id: 'files', name: 'Files & Timeline', icon: Upload }
  ];
  
  return (
    <div className="w-full bg-card rounded-lg p-4 mb-6">
      <h3 className="text-sm font-medium text-muted-foreground mb-3">
        Form Progress
      </h3>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {sections.map((section) => {
          const state = sectionStates[section.id];
          const Icon = section.icon;
          
          return (
            <div
              key={section.id}
              className={cn(
                "flex items-center space-x-2 p-2 rounded-md text-xs",
                currentSection === section.id && "bg-primary/10 border border-primary/20",
                state?.completed && state?.valid && "bg-green-50 border border-green-200",
                state?.completed && !state?.valid && "bg-red-50 border border-red-200"
              )}
            >
              <Icon className={cn(
                "h-4 w-4",
                state?.completed && state?.valid ? "text-green-600" :
                state?.completed && !state?.valid ? "text-red-600" :
                "text-muted-foreground"
              )} />
              <span className={cn(
                "font-medium",
                state?.completed && state?.valid ? "text-green-700" :
                state?.completed && !state?.valid ? "text-red-700" :
                "text-muted-foreground"
              )}>
                {section.name}
              </span>
              {state?.completed && state?.valid && (
                <CheckCircle className="h-3 w-3 text-green-600" />
              )}
              {state?.completed && !state?.valid && (
                <XCircle className="h-3 w-3 text-red-600" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};`
  },

  bestPractices: [
    "Use persistent state management for complex forms to prevent data loss",
    "Implement dynamic schema validation that adapts to form state changes",
    "Coordinate related fields automatically to improve user experience",
    "Provide clear visual feedback for section completion and validation status",
    "Use smooth animations for conditional sections (animate-in classes)",
    "Group toggle controls in organized panels with descriptions",
    "Maintain field organization pattern even within conditional sections",
    "Implement cross-section validation for interdependent requirements",
    "Use responsive layouts that adapt content based on conditional rendering",
    "Provide clear progress tracking across multiple form sections",
    "Clear unused fields when conditional sections are toggled off",
    "Validate sections independently while maintaining overall form integrity"
  ],

  commonIssues: [
    {
      problem: "Toggle sections not clearing fields on disable",
      solution: "Implement clearSectionFields function that resets form values when sections are toggled off"
    },
    {
      problem: "Dynamic validation not updating correctly",
      solution: "Use useEffect to re-trigger validation when schema dependencies change"
    },
    {
      problem: "Conditional sections causing layout jumps",
      solution: "Use animate-in classes and consistent Card layouts for smooth transitions"
    },
    {
      problem: "Form state lost on navigation",
      solution: "Implement persistent state management with localStorage backup"
    },
    {
      problem: "Complex forms becoming slow",
      solution: "Use useMemo for expensive computations and debounce auto-save operations"
    }
  ],

  debuggingTips: [
    "Log toggle states and form values to track conditional rendering logic",
    "Test all toggle combinations to ensure proper field clearing",
    "Verify responsive layout behavior with different conditional sections active",
    "Check that dynamic validation updates correctly for all form state changes",
    "Test form persistence across browser refresh and navigation",
    "Validate cross-section dependencies work correctly",
    "Ensure animations don't interfere with form functionality"
  ]
};

export default advancedFormStructures;
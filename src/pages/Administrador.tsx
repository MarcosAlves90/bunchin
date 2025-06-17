import { EmployeesSidebar, EmployeeForm, EmployeeTimeRecords } from "../components/admin";
import { useAdminLogic } from "../utils/hooks/useAdminLogic";

export default function Administrador() {
    const {
        funcionarios,
        funcionarioSelecionado,
        searchTerm,
        inputs,
        colapsed,
        sidebarCollapsed,
        lockInputs,
        isLoading,
        showEditModeMessage,
        loadingSubmit,
        showSuccessMessage,
        selectedDate,
        selectedDateISO,
        tema,
        usuario,
        cpfError,
        handleColapse,
        handleSidebarCollapse,
        handleDateChange,
        handleChange,
        handleSearchChange,
        handleSubmit,
        handleEmployeeButtonClick,
        clearSelection,
        handleLockInputs,
        deleteUser
    } = useAdminLogic();
    return (
        <div className="flex">
            <EmployeesSidebar
                funcionarios={funcionarios}
                searchTerm={searchTerm}
                funcionarioSelecionado={funcionarioSelecionado}
                isLoading={isLoading}
                tema={tema}
                usuario={usuario}
                sidebarCollapsed={sidebarCollapsed}
                onSearchChange={handleSearchChange}
                onEmployeeSelect={handleEmployeeButtonClick}
                onClearSelection={clearSelection}
            />
            <main className="mainCommon text-base flex justify-start items-center flex-col gap-2 text-primary">                <EmployeeForm
                    inputs={inputs}
                    funcionarioSelecionado={funcionarioSelecionado}
                    lockInputs={lockInputs}
                    loadingSubmit={loadingSubmit}
                    showSuccessMessage={showSuccessMessage}
                    showEditModeMessage={showEditModeMessage}
                    sidebarCollapsed={sidebarCollapsed}
                    cpfError={cpfError}
                    onSubmit={handleSubmit}
                    onChange={handleChange}
                    onSidebarToggle={handleSidebarCollapse}
                    onDeleteUser={deleteUser}
                    onToggleLock={handleLockInputs}
                />
                <EmployeeTimeRecords
                    funcionarioSelecionado={funcionarioSelecionado}
                    colapsed={colapsed}
                    selectedDate={selectedDate}
                    selectedDateISO={selectedDateISO}
                    onCollapseToggle={handleColapse}
                    onDateChange={handleDateChange}
                />
            </main>
        </div>
    );
}